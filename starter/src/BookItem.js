import { useNavigate } from "react-router-dom";
import {availableShelves} from "./constants"
import PropTypes from "prop-types";

const BookItem = ({ book, onMoveToShelf }) => {
    let navigate = useNavigate();
    
    return (
        <div className="book">
            <div className="book-top">
                <div
                    onClick={() => navigate(`/detail/${book.id}`) }
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks?.thumbnail || ''}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => onMoveToShelf(book, e)} value={book?.shelf || 'none'}>
                        <option value="none" disabled>
                        Move to...
                        </option>
                        {
                            availableShelves.map(shelf => {
                                return <option key={shelf.id} value={shelf.id}>{ shelf.label }</option>
                            })
                        }
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{ book.title }</div>
            <div className="book-authors">{ book.authors?.join(', ')}</div>
        </div>
    );
}

BookItem.propTypes = {
    onMoveToShelf: PropTypes.func.isRequired,
    book: PropTypes.any.isRequired,
};

export default BookItem;