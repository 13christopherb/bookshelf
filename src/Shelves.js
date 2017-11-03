import React, {Component} from "react";
import Book from "./Book.js";
import BookDisplay from "./BookDisplay.js"
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends BookDisplay {
    state = {
        books: []
    }

    /**
     * Searches for books matching the search parameter using BooksAPI and saves
     */
    componentDidMount() {
        BooksAPI.getAll().then((bks) => {
            var books = bks.map((bk) => {
                return <Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors} thumbnail={bk.imageLinks.smallThumbnail}
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
                    </div>
                    <div className="col-md-10">
                        <div className="row card-deck flex-row flex-nowrap">
                            {booksSet['currentlyReading']}
                        </div>
                        <div className="row card-deck flex-row flex-nowrap">
                            {booksSet['wantToRead']}
                        </div>
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
