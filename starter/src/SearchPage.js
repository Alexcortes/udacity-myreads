import { Link } from "react-router-dom";
import * as BooksApi from "./BooksAPI"
import { useState } from "react";
import BookItem from "./BookItem";

const SearchPage = ({onMoveToShelf}) => {
    const [searchResult, setSearchResult] = useState([]);

    const handleChange = (e) =>{
        const search = async () => {
            const response = await BooksApi.search(e.target.value, 10);
            
            if(response && !response.error){
                setSearchResult(response);
            }else{
                setSearchResult([]);
            }
        }

        search();
    }

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
                Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResult.map(book => {
                            return (
                                <li key={book.id}>
                                    <BookItem book={book} onMoveToShelf={onMoveToShelf}></BookItem>
                                </li>
                            );
                        })
                    }
                </ol>
          </div>
        </div>
    );
}

export default SearchPage;