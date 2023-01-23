import { Link } from "react-router-dom";
import * as BooksApi from "./BooksAPI"
import { useState } from "react";
import BookItem from "./BookItem";
import PropTypes from "prop-types";

const SearchPage = ({onMoveToShelf, books}) => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [debounceTimeOut, setDebounceTimeOut] = useState();

    const handleChange = (e) =>{
        clearTimeout(debounceTimeOut);

        setSearchString(e.target.value);

        const search = async (searchValue) => {
            const response = await BooksApi.search(searchValue);

            if(response && !response.error){
                const refinedResponse = response.map(item => {
                    const shelfItem = books.find(b => b.id === item.id);
                    if(shelfItem){
                        return shelfItem;
                    }else{
                        return item;
                    }
                });

                setSearchResult(refinedResponse);
            }else{
                setSearchResult([]);
            }
        }

        setDebounceTimeOut(setTimeout(() => {
            search(e.target.value);
        } , 1000));
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
            { searchString !== "" && searchResult.length > 0 && 
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
            }
            { searchString !== "" && searchResult.length === 0 && 
                <div className="empty-book-search">
                    <p>There are no books for the searched value</p>
                </div>
            }
        </div>
    );
}

SearchPage.propTypes = {
    onMoveToShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
  };
  

export default SearchPage;