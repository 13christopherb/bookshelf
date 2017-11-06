import React, {Component} from "react";
import { Link } from 'react-router-dom';
import Book from "./Book.js";
import BookDisplay from "./BookDisplay.js"
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends BookDisplay {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
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

            this.setState({
                books: books
            });
        })
    }

    render() {
        var booksSet = _.groupBy(this.state.books, (bk) => {
            return bk.props.shelf;
        });

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
                            {booksSet['currentlyReading']}
                        </div>
                        <h4>Want to read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {booksSet['wantToRead']}
                        </div>
                        <h4>Read</h4>
                        <div className="row card-deck flex-row flex-nowrap">
                            {booksSet['read']}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default BooksApp;
