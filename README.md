# Basic Database Using MongoDB

A simple chat application built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **EJS**. The project demonstrates how to perform basic CRUD (Create, Read, Update, Delete) operations on chat records stored in MongoDB.

## Features

- View all saved chats.
- Create a new chat with sender, receiver, and message details.
- Edit an existing chat message.
- Delete a chat.
- Store chat records in MongoDB using Mongoose.
- Render pages dynamically with EJS.
- Use `method-override` to support PUT and DELETE form requests.

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web application framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **EJS** – Server-side templating engine
- **method-override** – Enables PUT and DELETE methods through HTML forms

## Project Structure

```text
BASIC_DATABASE_USING_MONGODB/
├── models/
│   └── chat.js           # Mongoose chat schema and model
├── public/
│   └── style.css         # Application styles
├── views/
│   ├── index.ejs         # Displays all chats
│   ├── new.ejs           # Form to create a chat
│   └── edit.ejs          # Form to edit a chat
├── index.js              # Express server and CRUD routes
├── init.js               # Inserts sample chat records
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have installed:

- [Node.js](https://nodejs.org/) (includes npm)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

The application connects to a local MongoDB instance using:

```text
mongodb://127.0.0.1:27017/watshapp
```

Make sure your MongoDB server is running before starting the application. The database `watshapp` is created by MongoDB when data is first stored.

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   ```

2. **Open the project directory**

   ```bash
   cd BASIC_DATABASE_USING_MONGODB
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start MongoDB**

   Make sure your local MongoDB server is running.

5. **Insert sample chats (optional)**

   ```bash
   npm run seed
   ```

   This command inserts three sample chat records into the database. Run it when you want sample data; running it more than once will insert the sample records again.

6. **Start the application**

   ```bash
   npm start
   ```

7. **Open the application**

   Visit:

   ```text
   http://localhost:8080/chats
   ```

## Available Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Checks that the server is running |
| GET | `/chats` | Displays all chats |
| GET | `/chats/new` | Displays the new-chat form |
| POST | `/chats` | Creates a new chat |
| GET | `/chats/:id/edit` | Displays the edit form for a chat |
| PUT | `/chats/:id` | Updates a chat message |
| DELETE | `/chats/:id` | Deletes a chat |

## Chat Data Model

Each chat document contains the following fields:

| Field | Type | Description |
|---|---|---|
| `from` | String | Name of the sender (required) |
| `to` | String | Name of the receiver (required) |
| `msg` | String | Chat message (maximum 50 characters) |
| `created_at` | Date | Date and time when the chat was created (required) |

## Available npm Scripts

```bash
npm start       # Starts the Express application
npm run seed    # Inserts the sample chat records
```

## How It Works

1. A user opens the chats page.
2. Express retrieves chat documents from MongoDB through the Mongoose `Chat` model.
3. EJS renders the chat records in the browser.
4. The user can create, edit, or delete chat records using the available forms.
5. Express handles each request and updates MongoDB.

## Notes

- This project is configured for a **local MongoDB server**.
- The MongoDB connection string is currently defined directly in `index.js` and `init.js`.
- The application runs on port **8080**.
- The message field has a maximum length of **50 characters**, as defined in the Mongoose schema.

## Author

**Subhrajit Naskar**

---

If you find this project useful, feel free to star the repository.
