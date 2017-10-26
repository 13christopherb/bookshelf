import React, { Component } from 'react';
import Book from './Book.js';
import Shelf from './Shelf.js';
import * as BooksAPI from './BooksAPI'
import _ from 'underscore'

class BooksApp extends React.Component {
    state = {
        shelves: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((bks) => {
            var books= bks.map((bk) => {
                return <Book key={bk.id} title={bk.title} authors={bk.authors} thumbnail={bk.imageLinks.thumbnail}
                             shelf={bk.shelf}/>
            });
            var booksSet = _.groupBy(books, function(bk) {
                return bk.props.shelf;
            });

            var shelves = [];
            shelves.push(<Shelf key='currentlyReading' books={booksSet['currentlyReading']}/>);
            shelves.push(<Shelf key='wantToRead' books={booksSet['wantToRead']}/>);
            shelves.push(<Shelf key='read' books={booksSet['read']}/>);
            this.setState({
                shelves: shelves
            });
        })
    }

    render() {
        return(
            <div>
                {this.state.shelves}
            </div>
        )
    }
}



export default BooksApp;
