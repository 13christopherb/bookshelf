import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import _ from "underscore"

class Book extends React.Component {
    constructor(props) {
        super(props);
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
                <div className="card border-primary">
                    <img className="card-img-top img-responsive" src={ this.props.thumbnail } alt="Card image cap" />
                    <div className="card-body">
                        <p className="card-title">{ this.props.title }</p>
                        {this.props.authors &&
                            <p className="small card-text">{this.props.authors.join(' | ')}</p>
                        }
                        <select value={this.props.shelf} onChange={this.changeShelf}>
                            <option>None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Book;