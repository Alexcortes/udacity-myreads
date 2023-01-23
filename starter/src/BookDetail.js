import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as BooksApi from "./BooksAPI"
import { useEffect, useState } from "react";

const BookDetail = ({ onMoveToShelf }) => {
    let { id } = useParams();

    const [book, setBook] = useState();

    useEffect(() => {
        const getBookDetail = async () => {
            const response = await BooksApi.get(id);
            setBook(response);
        }

        getBookDetail();
    },[id]);


    return (
        <div className="book-detail">
            <div className="book-detail-title">
                <Link className="close-detail" to="/">
                    Close
                </Link>
                <h1>Book Detail</h1>
            </div>
            {book && <div className="book-detail-main">
                <div className="book-details-container">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                        }}
                    ></div>
                    <h2>
                        { book.title }
                    </h2>
                    <h4>
                        { book.subtitle }
                    </h4>
                    <p className="detail-item"><span className="topic-title">Description:</span> { book.description }</p>
                    <p className="detail-item"><span className="topic-title">Rating:</span> { book.averageRating }/5</p>
                    <p className="detail-item"><span className="topic-title">Authors:</span> { book.authors?.join(', ') }</p>
                    <p className="detail-item"><span className="topic-title">Categories:</span> { book.categories?.join(', ') }</p>
                    <p className="detail-item"><span className="topic-title">Publisher:</span> { book.publisher }</p>
                    <p className="detail-item"><span className="topic-title">Published in:</span> { book.publishedDate }</p>
                    <p className="detail-item"><span className="topic-title">Pages:</span> { book.pageCount }</p>
                </div>
            </div>}
            {book &&
                <div className="book-detail-shelf-changer">
                <select onChange={(e) => onMoveToShelf(book, e)} value={book.shelf || 'none'}>
                    <option value="none" disabled>
                    Move to...
                    </option>
                    <option value="currentlyReading">
                        Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
            }
            
        </div>
    );
}

export default BookDetail;