import React from "react";
import { Link } from 'react-router-dom';
import Book from "./Book.js";
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookShelves: new Object()
        }
    }

    /**
     * Responsible for changing the shelf of a book when a book's button is pressed
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    changeShelf = (book, shelf) => {
        var bookShelves = Object.assign(new Set(), this.state.bookShelves);
        var oldShelf = _.reject(bookShelves[book.props.shelf], (bk) => {
            return bk.props.id === book.props.id;
        });
        bookShelves[book.props.shelf] = oldShelf;
        bookShelves[shelf].push(<Book key={book.props.id} id={book.props.id}
                                   title={book.props.title} authors={book.props.authors}
                                   thumbnail={book.props.thumbnail}
                                   shelf={shelf} changeShelf={this.changeShelf}/>)
        this.setState({
            bookShelves: bookShelves
        })
        BooksAPI.update({id: book.props.id}, shelf);
    }

    /**
     * Fetches the books from the server
     */
    componentDidMount() {
        BooksAPI.getAll().then((bks) => {
            var books = bks.map((bk) => {
                return <Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors}
                             thumbnail={bk.imageLinks.smallThumbnail}
                             shelf={bk.shelf} changeShelf={this.changeShelf}/>
            });

            var booksSet = _.groupBy(books, (bk) => {
               return bk.props.shelf;
            });
            this.setState({
                bookShelves: booksSet
            });
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Link
                            to="/search"
                            className="btn"
                        >Search</Link>
                    </div>
                    <div className="col-md-10">
                        <h4>Currently reading</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {this.state.bookShelves["currentlyReading"]}
                        </div>
                        <h4>Want to read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {this.state.bookShelves["wantToRead"]}
                        </div>
                        <h4>Read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {this.state.bookShelves["read"]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BooksApp;
