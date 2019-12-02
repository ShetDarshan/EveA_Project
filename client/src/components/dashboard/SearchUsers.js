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
import './../../css/searchUser.css';
const searchClient = algoliasearch(
  '7Z6VFB8JQD',
  'fe812c7ddbd852cb3074294b24c7e641'
);
class SearchUsers extends Component {
    render() {
      return (
        <div className="ais-InstantSearch search-users">
          <InstantSearch indexName="users" searchClient={searchClient}>
            <div className="right-panel">
              <SearchBox/>
              <Hits hitComponent={Hit}/>
            </div>
            <Pagination/>
          </InstantSearch>
        </div>
      );
    }
  }
  function Hit(props) {
    return (
      <div class="search-users-container">
        <div className="imageContainer float-left">
          <Link to={`/friend/${props.hit.email}`} className="card-link">
              {/* <img className="imageBg"  src = {props.hit.imageUrl}/> */}
              <div key={props.hit.title+"-background"} className="imageBg" style={{backgroundImage: `url(${props.hit.imageUrl})`}}></div>  
          </Link>
        </div>
        <h5 className="card-title mb-2 mt-2 p-3 lead  float-left">
          <span className="hit-name">
            <Highlight attribute="name" hit={props.hit} />
            <Highlight attribute="title" hit={props.hit} />
            <Highlight attribute="address" hit={props.hit} />
          </span>
          </h5>
          <div className="clear-fix"></div>
      </div>
    );
  }
  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };
export default SearchUsers;
