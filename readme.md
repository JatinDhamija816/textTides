# textTides

This project is a blog application (similar to Medium) where users can register, log in, share their views by posting blogs, and update their profiles. Users can view blogs shared by others and manage their accounts by updating their profiles and passwords.


## Table if Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Register/Login:** Users can register and log in securely.
- **Forgot Password:** Users can reset their passwords if they forget them.
- **Home Page:** Displays all blogs posted by users.
- **Create/Edit Blogs:** Authenticated users can create, update, and delete their own blogs.
- **Profile Settings:** Users can update their profile information.
- **Responsive Design:** The website is optimized for mobile and desktop devices.

## Project Structure
This repository contains two main folders:
1. **server**: Contains the backend code (API and server logic).
2. **website**: Contains the frontend code (React + Vite).


## Installation

### 1. Clone the repository
```bash
git clone https://github.com/JatinDhamija816/textTides.git
cd textTides
```

### 2. Backend Setup (Server)
```bash
cd server
npm install
npm run build
```

To start the backend server, use:

```bash
npm run start
```

The Backend is a Node.js/Express application using TypeScript and Cloud Firestore as the database

### 3. Frontend Setup (Website)

```bash
cd ../website
npm install
```

To start the frontend in development mode using Vite, run:

``` bash
npm run dev
```

The frontend will be available at http://localhost:5173 (or any port specified by Vite).


## Usage
Once the backend and frontend are running, you can access the blog application via your browser. You can:

- Register a new user
- Log in to your account
- Create and view blogs
- Edit your profile from the settings page
- Use the forgot password functionality to reset your password if needed

## Technologies 

### Frontend:
- Framework: React.js (with Vite for fast build and development)
- Language: TypeScript
- Styling: Tailwind CSS 

### Backend:
- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Database: Cloud Firestore

### Authentication:
- JWT (JSON Web Tokens) for secure authentication and authorization.
### Additional Tools:
- Firebase Admin SDK for interacting with Firestore.
- bcrypt for password hashing.
- dotenv for managing environment variables.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

To contribute:

- Fork the project.
- Create a new feature branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.
