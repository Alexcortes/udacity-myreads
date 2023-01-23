import "./App.css";
import { useEffect, useState } from "react";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import { Route, Routes } from "react-router-dom";
import * as BooksApi from "./BooksAPI"
import BookDetail from "./BookDetail";

function App() {
  const [books, setBooks] = useState([]);

  const shelfs = [{
    id: "currentlyReading",
    label: "Currently Reading"
  },{
    id: "wantToRead",
    label: "Want to Read"
  },{
    id: "read",
    label: "Read"
  }];

  useEffect(() => {
    getBooks();
  },[]);

  const getBooks = async () => {
    const res = await BooksApi.getAll();
    setBooks(res);
  }

  const onMoveToShelf = (book, e) => {
    const updateBook = async () => {
      await BooksApi.update(book, e.target.value);
    }

    const newBookState = books;
    const bookIndex = books.findIndex(b => b.id === book.id);

    if(bookIndex >= 0){
      newBookState[bookIndex].shelf = e.target.value;
      console.log(newBookState[bookIndex]);
    }else{
      newBookState.push({ ...book, shelf: e.target.value });
    }

    setBooks([...newBookState]);

    updateBook();
  }

  return (
    <Routes>
      <Route exact path="/" element={
         <MainPage books={books} shelfs={shelfs} onMoveToShelf={onMoveToShelf} />
      } />
      <Route exact path="/search" element={
         <SearchPage onMoveToShelf={onMoveToShelf} />
      } />
      <Route exact path="/detail/:id" element={
         <BookDetail onMoveToShelf={onMoveToShelf} />
      } />
    </Routes>
  );
}

export default App;
