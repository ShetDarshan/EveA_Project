import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import Image from 'react-image-resizer';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody
  } from 'reactstrap';
import PropTypes from 'prop-types';
// import './../../css/search.css';
import './../../css/search.css';
import color from '@material-ui/core/colors/cyan';

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

    //     <div className="ais-InstantSearch" >
    //     <InstantSearch indexName="algoevents" searchClient={searchClient}>
    //       <div className="right-panel">
    //         <SearchBox />
    //         <Hits hitComponent={Hit} />
    //         <Pagination />  
    //       </div>
          
    //     </InstantSearch>
        
    //   </div>
      
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
    //     <div className="row" style={{boxSizing: "border-box", display:"inline"}} >
    //     <div className="col" style={{float:"left", width:"25%",padding:"5px"}}>
    //     <img src={props.hit.image}    alt={props.hit.title} />
    //     <Highlight attribute="name" hit={props.hit} />
    //     <Highlight attribute="description" hit={props.hit.title} />
    //     <div>$10</div>
    //     {/* <div className="hit-name">
         
    //     </div> */}
    //     {/* <div className="hit-description">
    //       <Highlight attribute="description" hit={props.hit.title} />
    //     </div> */}
    //     {/* <div className="hit-price">$10</div> */}
    //     </div>
    //   </div>
    
    <div>
        <div className="imageContainer" >
        
            <div  className="imageBg" style={{backgroundImage: `url(${props.hit.image}})`}}></div>
        </div>
     {/* <Image
          src={props.hit.image}
          height={ 250 }
          width={ 250 }
          style={style.image}
        /> */}
   {/* // <img src={props.hit.image} style={{width: "200px", height:"200"}} align="left" alt={props.hit.title} /> */}
    <span className="hit-name">
      <Highlight attribute="name" hit={props.hit} />
      {/* <h3>{props.hit}</h3> */}
    {/* </span> */}
    {/* <span className="hit-description"> */}
      <Highlight attribute="title" hit={props.hit} />
    {/* </span>
    <span className="hit-description"> */}
      <Highlight attribute="address"  hit={  props.hit} />
    </span>
  </div>

  

    );
  }
  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default Search;
