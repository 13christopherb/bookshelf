import React, {Component} from "react";
import Book from "./Book.js";
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends React.Component {
    state = {
        books: []
    }

    /**
     * Responsible for changing the shelf of a book when a book's button is pressed
     * @param book The book whose shelf is to be changed
     * @param shelf The shelf to move the book to
     */
    changeShelf = (book, shelf) => {
        var books = _.reject(this.state.books, (bk) => {
            console.log("" + bk.props.title + ": " + book.props.title);
            return bk.props.title === book.props.title
        });
        books.push(<Book key={book.props.id} title={book.props.title} authors={book.props.authors}
                         thumbnail={book.props.thumbnail}
                         shelf={shelf} changeShelf={this.changeShelf}/>);
        BooksAPI.update({id: book.props.id}, shelf);
        this.setState({books: books});
    }

    /**
     * Fetches a list of all books from a server and converts them into Book components
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
        console.log('test');
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
