import React, { Component } from "react";
import _ from "underscore"

class Book extends React.Component {
    state = {
        shelf: this.props.shelf
    }

    /**
     * Tells the App component to move this book to a different shelf
     */
    changeShelf = () => {
        this.props.changeShelf(this, "read");
    }

    render() {
        return(
            <div className="col-md-4">
                <button onClick={this.changeShelf}>
                    Change shelf
                </button>

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