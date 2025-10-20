// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5003/api/books", // your backend URL
// });

// // BOOK CRUD
// export const getBooks = () => API.get("/");
// export const getBook = (id) => API.get(`/${id}`);
// export const addBook = (book) => API.post("/", book);
// export const updateBook = (id, book) => API.put(`/${id}`, book);
// export const deleteBook = (id) => API.delete(`/${id}`);


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/api", // backend URL
});

// Books API
export const fetchBooks = () => API.get("/books");
export const addBook = (newBook) => API.post("/books", newBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);
