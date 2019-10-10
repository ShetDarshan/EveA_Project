import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

class EventItem extends Component {
  constructor(props){
    super(props);
    this.state ={
      showModal: false
    }
  }
  
  render() {
    const { event } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={event.img} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h5>{event.title}</h5>
            <h5>{event.location}</h5>
            <h5>{event.price}</h5>
            <Button outline color="info" onClick ={() => this.setState({
              showModal: true
            })}>Details
          </Button>
          <Modal isOpen={this.state.showModal}>
            <ModalHeader>{event.title}</ModalHeader>
            <ModalBody>
              <img src={event.img} alt="" />
              <b style={{color:"grey"}}>Summary:</b><p>{event.summary}</p>
              <b style={{color:"grey"}}>Event Date:</b><h4>{event.startdate}</h4>
              <b style={{color:"grey"}}>Event Price:</b><h4>{event.price}</h4><br/>
              <a href={event.read_more} className="btn btn-info">Visit Website</a>
            </ModalBody>
            <ModalFooter>
              <Button outline color="danger"  onClick ={() =>this.setState({
                showModal:false
              }) }>
                close
              </Button>
            </ModalFooter>
          </Modal>
          </div>
        </div>
      </div>
    );
  }
}


export default EventItem;
