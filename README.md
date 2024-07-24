![Prismanotion](https://github.com/user-attachments/assets/4bf9b823-b709-49c1-8800-85734c12d340)

# Review Club

Review Club is a platform designed to help users find, share, and discuss reviews for various products, services, or experiences, with a special focus on identifying and combating scams. It provides a centralized hub for users to engage in meaningful discussions, report fraudulent activities, and make informed decisions based on peer reviews and scam alerts.

## Features

-   **Authentication**: Sign up, log in, and manage user profiles.
-   **Reviews**: Create, read, update, and delete reviews.
-   **Engagement**: Comment on and like reviews.
-   **Search and Filter**: Discover reviews by category, rating, and other criteria.
-   **Backend Admin Panel**: For content moderation and user management, their is a backend admin panel.

## Team Members

1. [Mugilan](https://github.com/mugilankani)
2. [Alwin Sunil](https://github.com/AlwinSunil)
3. [Anam-Ashraf7](https://github.com/Anam-Ashraf7)

## Link to Product Walkthrough
1. https://docs.google.com/document/d/1oXrGfIhKFtzWUDhjcR3WW3nRGKKHXLdtIAP5h-TyJIE/edit?usp=sharing

## How It Works

1. Users can signup & log in to Review Club to create a profile.
2. Logged-in users can browse existing reviews or create new ones.
3. Reviews can be categorized, rated, and tagged for easy discovery.
4. Users can comment on and discuss reviews.
5. Admin can manage content and users to maintain community quality.

## Technologies Used

-   **Frontend**: React.js, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Prisma ORM
-   **Authentication**: Google OAuth
-   **Deployment**: (To be determined)

## Libraries & Tech Used

-   **React**
-   **Express**
-   **Prisma**
-   **Tailwind CSS**
-   **Multer**
-   **MonogoDB Atlas**

## How to Configure

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/review-club.git
    cd review-club
    ```

2. **Install Dependencies**:

    - For frontend:
        ```bash
        cd client
        npm install
        ```
    - For backend:
        ```bash
        cd ../server
        npm install
        ```

3. **Set Up the Database**:
    ```bash
    cd server
    npx prisma generate
    ```

## How to Run

1. **Start the Backend Server**:

    ```bash
    cd server
    npm run dev
    ```

2. **Start the Frontend Development Server** (in a new terminal):

    ```bash
    cd client
    npm start
    ```

3. **View the Application**: Open your browser and navigate to `http://localhost:3000`.
