import React from "react";
import {Link} from 'react-router-dom';
import Book from "./Book.js";
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends React.Component {
    state = {
        bookShelves: {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
    }

    /**
     * Responsible for changing the shelf of a book when a book's button is pressed
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    changeShelf = (book, shelf) => {
        var bookShelves = Object.assign({}, this.state.bookShelves);
        var oldShelf = _.reject(bookShelves[book.props.shelf], (bk) => {
            return bk.id === book.props.id;
        });
        bookShelves[book.props.shelf] = oldShelf;
        bookShelves[shelf].push({
            id: book.props.id,
            title: book.props.title,
            authors: book.props.authors,
            thumbnail: book.props.thumbnail,
            shelf: shelf
        });

        this.setState({
            bookShelves: bookShelves
        });
        BooksAPI.update({id: book.props.id}, shelf);
    }

    /**
     * Fetches the books from the server
     */
    componentDidMount() {
        BooksAPI.getAll().then((bks) => {
            var books = bks.map((bk) => {
                return {
                    id: bk.id,
                    title: bk.title,
                    authors: bk.authors,
                    thumbnail: bk.imageLinks.smallThumbnail,
                    shelf: bk.shelf
                }
            })

            var bookShelves = _.groupBy(books, (bk) => {
                return bk.shelf;
            });
            this.setState({
                bookShelves: bookShelves
            });
        })
    }

    render() {
        var bookShelves = {};
        for (var shelf in this.state.bookShelves) {
            bookShelves[shelf] = this.state.bookShelves[shelf].map((bk) => {
                return <Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors}
                             thumbnail={bk.thumbnail}
                             shelf={bk.shelf} changeShelf={this.changeShelf}/>
            });
        }

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
                            {bookShelves["currentlyReading"]}
                        </div>
                        <h4>Want to read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {bookShelves["wantToRead"]}
                        </div>
                        <h4>Read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {bookShelves["read"]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BooksApp;
