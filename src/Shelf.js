import React, { Component } from 'react';

class Shelf extends React.Component {
    state = {
        books: this.props.books
    }

    render() {
        return(
            <div>
                {this.state.books}
            </div>
        )
    }
}

export default Shelf;