import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight
} from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './../../css/search.css';
const searchClient = algoliasearch(
  '7Z6VFB8JQD',
  'fe812c7ddbd852cb3074294b24c7e641'
);
class Search extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="algoevents" searchClient={searchClient}>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
          <Pagination />
        </InstantSearch>
      </div>
    );
  }
}
const style = {
  image: {
    border: '1px solid #ccc',
    background: '#fefefe',
  },
};
function Hit(props) {
  return (
    <div>
      <div className="imageContainer" >
        
        <Link to={`/event/${props.hit.title}`} className="card-link">
        <img className="imageBg"  src = {props.hit.image}/>
        </Link>
      </div>
      <span className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
        <Highlight attribute="title" hit={props.hit} />
        <Highlight attribute="address" hit={props.hit} />
      </span>
    </div>
  );
}
Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Search;
