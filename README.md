# 📚 Library Management System

## 📖 Project Purpose

The **Library Management System** is designed to manage books and borrow records efficiently.  
It provides APIs to:

- Manage books (add, update, delete, list)
- Manage borrow records (create, list, aggregate total borrowed copies)
- Ensure proper validation
- Handle errors in a clean way

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ORM)
- **Validation:** Zod
- **Error Handling:** Custom middlewares
- **Authentication (future):** JWT

---

## 📌 Requirements

### ✅ Functional Requirements

1. **Book Management**

   - Add a new book with validation
   - Update book details
   - Delete a book
   - Fetch all books or single book
   - Control stock (`copies` decreases when borrowed, increases when returned)
   - Auto-update `available` → `false` if copies = 0

2. **Borrow Management**

   - Create a borrow record (book, quantity, due date)
   - Validate book existence (ObjectId check)
   - Aggregate borrow records grouped by book with total borrowed quantity
   - Fetch borrow records with book details (title, ISBN)

3. **Validation**

   - All inputs validated with **Zod**
   - Book fields required (title, author, genre, isbn, copies)
   - Borrow fields required (bookId valid ObjectId, quantity > 0, dueDate)

4. **Error Handling**

   - Global error handler (Zod + Mongoose + Server errors)
   - Not Found (404) route handler

5. **API Endpoints**
   - **Books**
     - `POST /api/books`
     - `GET /api/books`
     - `GET /api/books/:id`
     - `PATCH /api/books/:id`
     - `DELETE /api/books/:id`
   - **Borrows**
     - `POST /api/borrows`
     - `GET /api/borrows` (with aggregation results)

---

## 📂 Project Structure

```
src/
 ├── models/          # Book & Borrow Mongoose models
 ├── routes/          # API routes
 ├── validations/     # Zod validation schemas
 ├── controllers/     # Business logic
 ├── middlewares/     # Error handler, not-found handler
 ├── utils/           # Helper functions
 └── server.ts        # Entry point
```

---

📌 Features:

- Keeps track of borrowed book ID, quantity, and due date
- Updates book copies automatically

## ⚠️ Error Handling

- **Global Error Handler** → Formats all Zod + Mongoose + Server errors
- **404 Not Found Middleware** → Handles unknown routes

---

## ▶️ Run the Project

### 1. Clone Repo

```bash
git clone <repo_url>
cd library-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/librarydb
JWT_SECRET=yourSecretKey
```

### 4. Start Server

```bash
npm run dev
```

---

## 📖 Future Scope

- Add JWT authentication
- Role-based access (Admin, Librarian, Member)
- Borrow return & overdue tracking
- Analytics dashboard (popular books, top borrowers)
- Pagination & filtering

---

✨ **This project fulfills all requirements of a standard Library Management System with Book and Borrow management, validation, aggregation, and error handling.**
