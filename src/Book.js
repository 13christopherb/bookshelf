import React, { Component } from 'react';
import _ from 'underscore'

class Book extends React.Component {
    state = {
    }

    render() {
        return(
            <div className="col-md-3">
                <div className="card text-white bg-info">
                    <img className="card-img-top img-fluid" src={ this.props.thumbnail }/>
                    <div className="card-body">
                        <p className="card-title">{ this.props.title }</p>
                        <small className="card-text">{ this.props.authors.join(" | ") }</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Book;