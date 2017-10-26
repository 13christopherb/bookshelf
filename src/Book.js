import React, { Component } from 'react';

class Book extends React.Component {
    state = {
    }

    render() {
        return(
            <div>
                {this.props.title}
                {this.props.authors}
                <img src={this.props.thumbnail}/>
            </div>
        )
    }
}

export default Book;