import React, { Component } from 'react';

class Book extends React.Component {
    state = {
        status: "reading"
    }

    render() {
        return(
            <div>
                {this.props.title}
            </div>
        )
    }
}

export default Book;