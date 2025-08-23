# Full-Stack Recipe Book User Management Application

This is a full-stack web application built to manage users for a "Recipe Book" platform. It features a complete CRUD (Create, Read, Update, Delete) interface for user administration, handles profile picture uploads, and sends email confirmations upon registration.

The front end is a clean, single-page dashboard built with vanilla JavaScript and styled with Tailwind CSS.

---

## Features

-   **Full CRUD Functionality**: Add, view, edit, and delete users from a single dashboard.
-   **Profile Picture Uploads**: Users can upload a profile picture during registration or update it later. Handled by Multer and stored on the server.
-   **Email Confirmation**: Automatically sends a "Welcome" email to new users upon successful registration using Nodemailer.
-   **Dynamic UI**: A responsive, single-page interface that updates in real-time without page reloads.
-   **RESTful API**: A well-structured backend API built with Node.js and Express.js.
-   **Secure & Efficient**: Uses prepared statements to prevent SQL injection and stores only file paths in the database for efficiency.

---

## Technology Stack

-   **Frontend**: HTML5, Tailwind CSS (via CDN), Vanilla JavaScript
-   **Backend**: Node.js, Express.js
-   **Database**: MySQL
-   **File Uploads**: Multer
-   **Emailing**: Nodemailer with Gmail
-   **Development**: Nodemon for automatic server restarts

---

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 16 or higher is recommended)
-   [MySQL](https://www.mysql.com/downloads/) Server
-   A code editor like [Visual Studio Code](https://code.visualstudio.com/)
-   An API testing tool like [Postman](https://www.postman.com/) or the Thunder Client VS Code extension.

---

## Setup and Installation

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Backend Dependencies

```
npm install
```

### 3. Set Up the Database

1.  Log in to your MySQL server and create the database:
    ```
    CREATE DATABASE recipe_book_db;
    ```
2.  Use the new database:
    ```
    USE recipe_book_db;
    ```
3.  Create the `users` table by running the following SQL command:
    ```
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        profile_picture VARCHAR(255),
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 4. Configure Environment Variables

1.  Create a file named `.env` in the root of the project.
2.  Add the following configuration details. **Do not use your main Gmail password.** Instead, [generate an App Password](https://support.google.com/accounts/answer/185833) from your Google Account security settings.

    ```
    # Database Configuration
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=recipe_book_db

    # Nodemailer Configuration (use Gmail App Password)
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

---

## How to Run the Application

1.  **Start the backend server:**
    ```
    npm start
    ```
    The server will start on `http://localhost:3000`, and Nodemon will automatically restart it if you make changes to backend files.

2.  **Access the application:**
    Open your web browser and navigate to **`http://localhost:3000/index.html`**. This will load the main user management dashboard.

---

## API Endpoints

The application exposes the following REST API endpoints:

```
| Method | Endpoint                 | Description                                    |
| :----- | :----------------------- | :--------------------------------------------- |
| `POST` | `/api/users/register`    | Registers a new user (used by the "Add" form). |
| `GET`  | `/api/users`             | Retrieves a list of all registered users.      |
| `GET`  | `/api/users/:id`         | Retrieves a single user by their ID.           |
| `PUT`  | `/api/users/:id`         | Updates the details of an existing user.       |
| `DELETE`| `/api/users/:id`         | Deletes a user by their ID.                    |
```

---

### **2. Uploading Your Project to GitHub**

Now, follow these command-line steps to upload your entire project.

#### **Step 1: Create a `.gitignore` file**

This is a critical step. This file tells Git to ignore certain files and folders, so you don't upload unnecessary or sensitive information to GitHub.

Create a file named `.gitignore` in the root of your project (the same level as `README.md`). Add the following lines to it:

```
# Dependencies
/node_modules

# Environment variables
.env

# Uploaded files
/uploads
```

This will prevent your `node_modules` folder, your secret credentials in `.env`, and all user-uploaded images from being committed to your repository.

#### **Step 2: Initialize Git and Make Your First Commit**

Open your terminal in the project's root directory and run these commands one by one.

```bash
# Initialize a new Git repository in your project folder
git init

# Add all files to the staging area (Git will automatically ignore files listed in .gitignore)
git add .

# Commit the files with a descriptive message
git commit -m "Initial commit: Setup full-stack recipe book CRUD application"
```

#### **Step 3: Create a New Repository on GitHub**

1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `recipe-book-app`).
4.  Provide an optional description.
5.  Make sure the repository is set to **Public**.
6.  **Do not** initialize it with a README, .gitignore, or license, as you have already created these.
7.  Click **"Create repository"**.

#### **Step 4: Link Your Local Project to the GitHub Repository and Push**

On the next page, GitHub will show you the commands needed to push an existing repository. They will look like this:

```bash
# Renames the default branch to "main" (a modern standard)
git branch -M main

# Adds the URL of your new GitHub repo as a remote destination named "origin"
git remote add origin https://github.com/your-username/your-repo-name.git

# Pushes your committed files from your local "main" branch to the "origin" remote
git push -u origin main
```

Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name. Run these three commands in your terminal.
