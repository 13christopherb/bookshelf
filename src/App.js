import React from "react";
import { Route } from 'react-router-dom';
import Book from "./Book.js";
import Shelves from "./Shelves.js";
import SearchResults from "./SearchResults.js";
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showSearchResults: false,
            searchField: ""
        };
    }


    /**
     * Responsible for changing the shelf of a book when a book's button is pressed
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    changeShelf = (book, shelf) => {
        var books = _.reject(this.state.books, (bk) => {
            return bk.props.title === book.props.title
        });
        books.push(<Book key={book.props.id} title={book.props.title} authors={book.props.authors}
                         thumbnail={book.props.thumbnail}
                         shelf={shelf} changeShelf={this.changeShelf}/>);
        BooksAPI.update({id: book.props.id}, shelf);
        this.setState({books: books});
    }

    showSearch = () => {
        this.setState({
            showSearchResults: true
        })
    }

    hideSearch = () => {
        this.setState({
            showSearchResults: false
        })
    }

    render() {
            return (
                <div className="container-fluid">
                    <Route exact path="/" component={Shelves} books={this.state.books}/>
                    <Route exact path="/search" component={SearchResults} books={this.state.books}/>
                </div>
            )
        }
}


export default BooksApp;
