import React, { Component } from 'react';

class Shelf extends React.Component {
    state = {
        books: this.props.books
    }

    render() {
        return(
            <div className="row bookshelf flex-box flex-nowrap">
                    { this.state.books }
                    { this.state.books }
                    { this.state.books }
            </div>
        )
    }
}

export default Shelf;