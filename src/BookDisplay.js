import React, {Component} from "react";
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BookDisplay extends React.Component {
    state = {
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

}


export default BookDisplay;
