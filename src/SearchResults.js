import React, {Component} from "react";
import { Link } from 'react-router-dom';
import Book from "./Book.js";
import BookDisplay from "./BookDisplay.js"
import * as BooksAPI from "./BooksAPI"

class SearchResults extends BookDisplay {
    state = {
        books: [],
        searchResults: [],
        searchQuery: ""
    }

    /**
     * Searches for books matching the search parameter using BooksAPI
     * @param e The change event for the search field
     */
    search= (e) => {
        if (e.target.value.length > 0) {
            BooksAPI.search(e.target.value, 10).then((bks) => {
                var books = [];
                if (bks.length) {
                    books = bks.map((bk) => {
                        try {
                            return <Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors}
                                         thumbnail={bk.imageLinks.smallThumbnail}
                                         shelf={bk.shelf} changeShelf={this.changeShelf}/>
                        }
                        catch(err) {
                        }
                    });
                }
                this.setState({
                    searchResults: books
                });
            })
        }
        else {
            this.setState({
                books: []
            })
        }
    }

    render() {
        if (this.state.searchResults.length > 0) {
            var firstShelf = this.state.searchResults.slice(0, 4);
            var secondShelf = this.state.searchResults.slice(5, 9);
        }

        return (
            <div className="container-fluid">
                <Link
                    to="/"
                    className="btn"
                >Close</Link>
                <input tyoe="search" className="form-control" onChange={this.search}></input>
                <div className="row">
                    <div className="col-md-10">
                        <div className="row card-deck flex-row flex-nowrap">
                            {firstShelf}
                        </div>
                        <div className="row card-deck flex-row flex-nowrap">
                            {secondShelf}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchResults;
