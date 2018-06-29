import React from 'react';
import ArticleList from "./ArticleList";
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";
import pickBy from 'lodash.pickby';
import Timestamp from "./Timestamp";

export default class App extends React.Component {

    static childContextTypes = {
        store: PropTypes.object,
    };

    getChildContext() { //to get and return the context object
        return {
            store: this.props.store
        };
    }

    appState = () => {
        const {articles, searchTerm} = this.props.store.getState();
        return {articles, searchTerm};
    };

    state = this.appState();

    onStoreChange = () => {
        this.setState(this.appState);
    };

    componentDidMount() {
        this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
        this.props.store.startClock();
    }

    componentWillUnmount() {
        this.props.store.unsubscribe(this.subscriptionId);
    }


    render() {
        let {articles, searchTerm} = this.state;

        const searchRE = new RegExp(searchTerm, 'i'); //make searchTerm case insensitive

        if (searchTerm) {
            articles = pickBy(articles, (value) => {
                return value.title.match(searchRE)
                    || value.body.match(searchRE);
            });
        }

        return (
            [
                <Timestamp key="timestamp"/>,
                <SearchBar
                    key="searchBar"
                />,
                <ArticleList
                    key="articleList"
                    articles={articles}
                />
            ]
        );
    }
}