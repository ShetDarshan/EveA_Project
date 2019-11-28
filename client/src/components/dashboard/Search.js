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

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }      

    onKeyPressed(e) {
       const key = e.keyCode;
       const val = document.getElementsByClassName("ais-SearchBox-input")[0].value;
      console.log("key pressed",key,val);
      if(key === 8 && val == 0){ 
          document.getElementsByClassName("ais-Hits")[0].style.cssText +="display:none";
          document.getElementsByClassName("ais-Pagination")[0].style.cssText +="display:none";
          document.getElementsByClassName("eventCategories")[0].style.cssText +="display:block";
          
        }
       else {
         document.getElementsByClassName("ais-Hits")[0].style.cssText +="display:block"; 
         document.getElementsByClassName("ais-Pagination")[0].style.cssText +="display:block"; 
         document.getElementsByClassName("eventCategories")[0].style.cssText +="display:none";
        }
    }
  render() {
    return (
      <div className="ais-InstantSearch">
        <InstantSearch indexName="algoevents" searchClient={searchClient}>
          <div className="right-panel">
            <div className="search-container m-4 w-70">
              <SearchBox className="form-control mr-sm-2 " onKeyDown={this.onKeyPressed} />
            </div>
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
    <div>
      <Link to={`/event/${props.hit.title}`} className="card-link">
          <div className="imageContainer" title={props.hit.title}>
              <div key={props.hit.title+"-background"} className="imageBg" style={{backgroundImage: `url(${props.hit.image})`}}></div>  
          </div>
          <h5 className="card-title mb-2 mt-2 pt-0 lead ">
          <span className="hit-name">
            <Highlight attribute="name" hit={props.hit} />
            <Highlight attribute="title" hit={props.hit} />
            <Highlight attribute="address" hit={props.hit} />
          </span>
          </h5>
      </Link>
    </div>
  );
}
Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Search;
