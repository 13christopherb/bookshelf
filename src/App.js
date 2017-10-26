import React, { Component } from 'react';
import Book from './Book.js';

class BooksApp extends React.Component {
    state = {

    }

    render() {

        return(
            <div>
                <Book title={"1984"}/>
                <Book title={"Slaughterhouse 5"}/>
                <Book title={"The Dragon Reborn"}/>
            </div>
        )
    }
}



export default BooksApp;
