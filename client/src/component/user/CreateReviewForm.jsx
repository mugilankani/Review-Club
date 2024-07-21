import { useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { imageDB } from "../../firebase/config";
import { getDownloadURL, ref,uploadBytes } from "firebase/storage"
import { v4 } from 'uuid';

// Validation schema
const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	content: Yup.string().required("Content is required"),
	rating: Yup.number().min(0).max(5).required("Rating is required"),
	images: Yup.array()
		.of(Yup.mixed())
		.max(4, "Cannot upload more than 4 images"),
});

function CreateReviewForm({ reviews, setReviews }) {
	const [imagePreviews, setImagePreviews] = useState([]);
	const [files,setFiles] = useState()

	const handleFileChange = (event) => {
		const files = Array.from(event.target.files).slice(0, 4); // Limit to 4 files
		setFiles(files)
		const previews = files.map((file) => URL.createObjectURL(file));
		setImagePreviews(previews);
	};
	
	const handleImageUpload = async (setFieldValue,values) => {
		const imageLinks = []
		if(!files){
			throw new Error("No image uploaded")
		}
		for(const file of files){
			const imageRef = ref(imageDB,`reviews/${v4()}`)
			await uploadBytes(imageRef, file)
			const url = await getDownloadURL(imageRef)
			imageLinks.push(url)
		}
		console.log(imageLinks)	
		return imageLinks
	}

	const handleSubmit = async (values, { setSubmitting, setErrors }) => {
		const imageLinks = await handleImageUpload()
		const updatedValues = {...values,images: imageLinks}
		console.log(updatedValues)

		try {
			const response = await axios.post(
				"http://localhost:3000/post",
				updatedValues,{
					withCredentials: true
				}
			);

			// Handle success
			console.log("Review submitted successfully:", response.data);
			setReviews([...reviews, response.data]);

			// Clear the form
			setSubmitting(false);
			setImagePreviews([]);

		} catch (error) {
			console.error("Error submitting review:", error);
			setErrors({ submit: "Failed to submit review. Please try again." });
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-r flex items-center justify-center p-6">
			<div className="max-w-md w-full border-2 bg-white shadow-lg rounded-lg p-8">
				<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
					Create Review
				</h2>
				<Formik
					initialValues={{
						name: "",
						content: "",
						rating: 0,
						images: []
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, errors }) => (
						<Form>
							<div className="mb-4">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<Field
									type="text"
									id="name"
									name="name"
									className="mt-1 block border border-black w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								<div className="text-red-600 text-sm">
									{errors.name}
								</div>
							</div>
							<div className="mb-4">
								<label
									htmlFor="content"
									className="block text-sm font-medium text-gray-700"
								>
									Review
								</label>
								<Field
									as="textarea"
									id="content"
									name="content"
									rows="4"
									className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 border border-black focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								<div className="text-red-600 text-sm">
									{errors.content}
								</div>
							</div>
							<div className="mb-4">
								<label
									htmlFor="rating"
									className="block text-sm font-medium text-gray-700"
								>
									Rating
								</label>
								<Field
									type="number"
									id="rating"
									name="rating"
									min="0"
									max="5"
									className="mt-1 block w-full border border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								/>
								<div className="text-red-600 text-sm">
									{errors.rating}
								</div>
							</div>
							<div className="mb-4">
								<label
									htmlFor="images"
									className="block text-sm font-medium text-gray-700"
								>
									Upload Images (up to 4)
								</label>
								<input
									type="file"
									id="images"
									name="images"
									accept="image/*"
									multiple
									onChange={(event) =>
										handleFileChange(event)
									}
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								/>
								<div className="mt-4 grid grid-cols-2 gap-4">
									{imagePreviews.map((preview, index) => (
										<img
											key={index}
											src={preview}
											alt={`Preview ${index + 1}`}
											className="w-full h-32 object-cover rounded-md"
										/>
									))}
								</div>
								<div className="text-red-600 text-sm">
									{errors.images}
								</div>
							</div>
							{errors.submit && (
								<div className="text-red-600 text-sm mb-4">
									{errors.submit}
								</div>
							)}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								{isSubmitting
									? "Submitting..."
									: "Submit Review"}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default CreateReviewForm;