import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import {availableShelves} from "./constants"
import PropTypes from "prop-types";

const MainPage = ({ books, onMoveToShelf }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
                <div className="list-books-content">
                    <div>
                        {
                            availableShelves.map(shelf => {
                                return (
                                <div key={shelf.id} className="bookshelf">
                                    <h2 className="bookshelf-title">{ shelf.label }</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {
                                                books.filter(book => book.shelf === shelf.id).map(book => {
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
                            })
                        }
                    </div>
                </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}

MainPage.propTypes = {
    onMoveToShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
};

export default MainPage;