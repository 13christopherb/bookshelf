import React from "react";
import {Link} from 'react-router-dom';
import {Debounce} from 'react-throttle';
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI";
import _ from "underscore";

class SearchResults extends React.Component {
    state = {
        books: [],
        searchResults: [],
        searchQuery: ""
    };

    /**
     * Responsible for adding a book to a shelf
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    addToShelf = (book, shelf) => {
        var searchResults = this.state.searchResults.slice();
        _.each(searchResults, (bk) => {
            if (bk.id === book.props.id) {
                bk.shelf = shelf;
            }
        });
        this.setState({
            searchResults: searchResults
        })
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

            this.setState({
                books: books
            });
        })
    }

    /**
     * Searches for books matching the search parameter using BooksAPI
     * @param e The change event for the search field
     */
    search = (e) => {
        if (e.target.value.length > 0) {
            BooksAPI.search(e.target.value, 10).then((bks) => {
                var books = [];
                if (bks.length) {
                    books = bks.map((bk) => {
                        try {
                            //See if book is already on a shelf
                            var book = _.find(this.state.books, (book) => {
                                return book.id === bk.id;
                            });
                            if (book) {
                                return book;
                            }
                            return {
                                id: bk.id,
                                title: bk.title,
                                authors: bk.authors,
                                thumbnail: bk.imageLinks.smallThumbnail,
                                shelf: bk.shelf
                            }
                        }
                        catch (err) {
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
                searchResults: []
            })
        }
    }

    render() {
        var searchResults = [];
        _.each(this.state.searchResults, (bk) => {
            searchResults.push(<Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors}
                                     thumbnail={bk.thumbnail}
                                     shelf={bk.shelf} changeShelf={this.addToShelf}/>)
        });
        if (this.state.searchResults.length > 0) {
            var firstShelf = searchResults.slice(0, 4);
            var secondShelf = searchResults.slice(5, 9);
        }

        return (
            <div className="container-fluid">
                <Link
                    to="/"
                    className="btn"
                >Close</Link>
                <Debounce time="400" handler="onChange">
                    <input tyoe="search" className="form-control" onChange={this.search}></input>
                </Debounce>
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
