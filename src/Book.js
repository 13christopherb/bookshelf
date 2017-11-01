import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import _ from "underscore"

class Book extends React.Component {
    state = {
        shelf: this.props.shelf
    }

    /**
     * Tells the App component to move this book to a different shelf
     */
    changeShelf = (e) => {
        this.props.changeShelf(this, e.target.value);
    }

    render() {
        return(
            <div className="col-md-4">
                <div className="book-shelf-changer">
                    <select value={this.state.shelf} onChange={this.changeShelf}>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                </div>
                <div className="card border-primary">
                    <img className="card-img-top" src={ this.props.thumbnail } alt="Card image cap" />
                    <div className="card-body">
                        <p className="card-title">{ this.props.title }</p>
                        <p className="small card-text">{ this.props.authors.join(' | ') }</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Book;