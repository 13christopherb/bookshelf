import React from "react";
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI";
import _ from "underscore";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookShelves: new Object(),
            searchResults: [],
            searchQuery: ""
        };
    }

    /**
     * Responsible for adding a book to a shelf
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    addToShelf = (book, shelf) => {
        var booksSet = Object.assign(new Set(), this.state.bookShelves);
        booksSet[shelf].push(<Book key={book.props.id} id={book.props.id}
                                   title={book.props.title} authors={book.props.authors}
                                   thumbnail={book.props.thumbnail}
                                   shelf={shelf} changeShelf={this.addToShelf}/>)

        this.setState({
            bookShelves: booksSet
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
                             shelf={bk.shelf} changeShelf={this.addToShelf}/>
            });
            var booksSet = _.groupBy(books, (bk) => {
                return bk.props.shelf;
            });

            this.setState({
                bookShelves: booksSet
            });
        })
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
                            //See if book is already on a shelf
                            for (var shelf in this.state.bookShelves) {
                                var book = _.find(this.state.bookShelves[shelf], (shelfBook) => {
                                    return shelfBook.props.id === bk.id;
                                });
                                if (book) {
                                    return book;
                                }
                            }
                            return <Book key={bk.id} id={bk.id} title={bk.title} authors={bk.authors}
                                         thumbnail={bk.imageLinks.smallThumbnail}
                                         shelf={bk.shelf} changeShelf={this.addToShelf}/>
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
                searchResults: []
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
