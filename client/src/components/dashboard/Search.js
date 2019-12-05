import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import Geocode from "react-geocode";
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
  'RPK4QHS3WC',
  '8fa8a55177bc1eae5c040bf3ca83f676'
);

Geocode.setApiKey("AIzaSyDUhIA8M9ad-4bu2bvpuKu3jXnbAjpicBk");
Geocode.setLanguage("en");

class Search extends Component {
      componentWillUnmount() {
          document.removeEventListener("keydown", this.onKeyPressed.bind(this));
      }      
      onKeyPressed(e) {
        const key = e.keyCode;
        const val = document.getElementsByClassName("ais-SearchBox-input")[0].value;
        
        if(key === 8 && val == 0){ 
            document.getElementsByClassName("ais-Hits")[0].style.cssText +="display:none";
            document.getElementsByClassName("ais-Pagination")[0].style.cssText +="display:none";
            document.getElementsByClassName("eventCategories")[0].style.cssText +="display:block";
            
          } else {
          document.getElementsByClassName("ais-Hits")[0].style.cssText +="display:block"; 
          document.getElementsByClassName("ais-Pagination")[0].style.cssText +="display:block"; 
          document.getElementsByClassName("eventCategories")[0].style.cssText +="display:none";
          }
      }
  render() {
    return (
      <div className="ais-InstantSearch search-events">
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
  let src, des;
  // navigator.geolocation.getCurrentPosition(location => {
  //   src.lat = location.coords.latitude;
  //   src.lon = location.coords.longitude;
  // });
  // console.log(src,des);
  // Geocode.fromAddress(props.hit.address).then(
  //   response => {
  //     des.lat = response.results[0].geometry.location.lat;
  //     des.lon = response.results[0].geometry.location.lon;
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
                {/* <a href={`https://www.google.com/maps?saddr=${src.lat},${src.lon}&daddr=${des.lat},${des.lon}`} target="_blank" className="card-link locationIcon float-right"></a> */}
              </h5>
          </Link>
        </div>
      );
    // },
    // error => {
    //   console.error(error);
    // });
}
Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Search;
