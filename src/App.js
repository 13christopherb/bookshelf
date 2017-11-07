import React from "react";
import { Route } from 'react-router-dom';
import Book from "./Book.js";
import Shelves from "./Shelves.js";
import SearchResults from "./SearchResults.js";
import "./app.css";
import * as BooksAPI from "./BooksAPI"
import _ from "underscore"

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchField: ""
        };
    }

    render() {
            return (
                <div className="container-fluid">
                    <Route exact path="/" component={Shelves} books={this.state.books}/>
                    <Route exact path="/search" component={SearchResults} books={this.state.books}/>
                </div>
            )
        }
}


export default BooksApp;
