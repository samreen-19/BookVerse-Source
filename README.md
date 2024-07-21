# BookVerse

**BookVerse** is a comprehensive online bookstore application built with modern web technologies. It offers a seamless experience for users to browse, purchase, and manage books, while providing administrative functionalities for managing the book inventory. The application is designed using the MERN stack (MongoDB, Express.js, React, Node.js) and features a clean, user-friendly interface with various functionalities for both users and administrators.

## Features

### User Features
- **Browse Books:** View a catalog of books with details such as title, author, price, and language.
- **Book Details:** Get detailed information about individual books, including descriptions and images.
- **Shopping Cart:** Add books to your cart, view the cart, and proceed to checkout.
- **Favorites:** Save books to a favorites list for easy access later.
- **Order History:** View past orders.

### Admin Features
- **Manage Books:** Add, update, and delete books from the inventory.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Netlify (Frontend), Render (Backend)

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

### Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/samreen-19/BookVerse-Source.git
    cd BookVerse-Source
    ```

2. **Setup Backend:**

    - Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Create a `.env` file in the `backend` directory with the required environment variables. Example:

        ```env
        URI=your_mongodb_uri
        PORT=5000
        ```

    - Start the backend server:

        ```bash
        nodemon app.js
        ```

3. **Setup Frontend:**

    - Navigate to the `frontend` directory:

        ```bash
        cd ../frontend
        ```

    - Install dependencies:

        ```bash
        npm install
        ```

    - Start the frontend application:

        ```bash
        npm run dev
        ```

## Usage

To use the BookVerse application locally:

1. Ensure you have both the backend and frontend running on your local machine.
2. Open your web browser and navigate to `http://localhost:3000` (or the port specified in your frontend configuration).
3. Use the application to browse books, manage your cart, and access features based on your role (user or admin).

## Screenshots

Here are some screenshots of the BookVerse application:

### Homepage
![Homepage](![image](https://github.com/user-attachments/assets/d5b6a9e6-84d4-49d4-9172-c172b8d9299f)
)

### Book Details Page
![Book Details](![image](https://github.com/user-attachments/assets/f1639de6-124d-4dcb-a4d4-d94e9fddf290)
)

### Shopping Cart
![Shopping Cart](![image](https://github.com/user-attachments/assets/30b2ef04-ec15-4578-a8ca-feba56534fd9)
)

### Admin Dashboard
![Admin Dashboard](![image](https://github.com/user-attachments/assets/593bda01-f1d7-4f44-90df-c35b7fdcc3b0)
)

*Note: Replace the image paths with the actual paths where your screenshots are stored.*

## Deployment

- **Frontend:** Deployed on [Netlify](https://www.netlify.com/). For deployment, follow Netlify’s deployment guide.
- **Backend:** Deployed on [Render](https://render.com/). For deployment, follow Render’s deployment guide.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
