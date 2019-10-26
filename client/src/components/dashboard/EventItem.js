// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
//  import MapContainer from './MapContainer'
// import {
//   IconButton
// } from "@material-ui/core";
// import {
//   Room as RoomIcon
// } from "@material-ui/icons";

// class EventItem extends Component {
//   constructor(props){
//     super(props);
//     this.state ={
//       showModal: false,
//       locationModal: false,
//       locationClose: false
//     }
//   }
  
//   render() {
//     const { event } = this.props;

//     return (
//       <div className="card card-body bg-light mb-3">
//         <div className="row">
//           <div className="card-img-top">
//             <img src={event.img} alt="" className="rounded-circle" />
//           </div>
//           <div className="col-lg-6 col-md-4 col-sm-2">
//             <h5>{event.title}</h5>
//             <h5>{event.location}</h5>
//             <h5>{event.price}</h5>
//             <Button outline color="info" onClick ={() => this.setState({
//               showModal: true
//             })}>Details
//           </Button>
//                  <IconButton
//                     style={{
//                                border: "1px solid blue",
//                                color: "blue",
//                                                      marginRight: "10px"
//                                                 }}
//                                                 onClick={() => {
//                                                   this.setState({locationModal:true})
//                                                   this.setState({locationClose:true})
                                                   
//                                                 }}
//                                             >
//                                                 <RoomIcon />
//                                                 </IconButton>

//                    <Modal isOpen={this.state.locationModal}>
//                   <ModalHeader closeButton>Location  
//                       <Button  style={{marginLeft: "310px"}} variant="contained" color="primary" 
//                       onClick={() => this.setState({locationModal:false}) }>
//                              CLOSE
//                          </Button>  
//                   </ModalHeader>
              
//                   <MapContainer
//               lat={+event.latitude}
//               long={+event.longitude}
//             />              
//              </Modal>

//            {/* <div>                            
//            <MapContainer
//               lat={+event.latitude}
//               long={+event.longitude}
//             /> 
//             </div>    */}
//           <Modal isOpen={this.state.showModal}>
//             <ModalHeader>{event.title}</ModalHeader>
//             <ModalBody>
//               <img src={event.img} alt="" />
//               <b>Summary:</b><p>{event.summary}</p>
//               <b>Event Date:</b><h4>{event.startdate}</h4>
//               <b>Event Price:</b><h4>{event.price}</h4><br/>
//               <a href={event.read_more} className="btn btn-info">Visit Website</a>
//             </ModalBody>
//             <ModalFooter>
//               <Button outline color="danger"  onClick ={() =>this.setState({
//                 showModal:false
//               }) }>
//                 CLOSE
//               </Button>
//             </ModalFooter>
//           </Modal>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


// export default EventItem;


//   const [event] = useState(props.event);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from 'reactstrap';
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
 import MapContainer from './MapContainer'
 import Carousel from 'react-bootstrap/Carousel'
import {
  IconButton
} from "@material-ui/core";
import {
  Room as RoomIcon
} from "@material-ui/icons";
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "300px",
    margin: "2%",
    display: "inline-block",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default props => {
  const classes = useStyles();
  const [event] = React.useState(props.event);
  const [expanded, setExpanded] = React.useState(false);
  const [showModal,setshowModal] = React.useState(false);
  const [locationModal,setlocationModal] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return ( 
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
             {event.category.substring(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={event.title}
        subheader={event.startdate}
      />
      <CardMedia
        className={classes.media}
        image={event.img}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{maxLength: 11}}> 
        {event.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <Button outline color="info" onClick ={() => setshowModal(true)}>Details
          </Button> */}
            <IconButton
                    style={{
                              //  border: "1px solid blue",
                               color: "grey",
                                                     marginRight: "10px"
                                                }}
                                                onClick={() => {
                                                  setshowModal(true)
                                                   
                                                }}
                                            >
                                                <VisibilityIcon />
                                                </IconButton>
                 <IconButton
                    style={{
                              //  border: "1px solid blue",
                               color: "grey",
                                                     marginRight: "10px"
                                                }}
                                                onClick={() => {
                                                  setlocationModal(true)
                                                   
                                                }}
                                            >
                                                <RoomIcon />
                                                </IconButton>

                   <Modal isOpen={locationModal}>
                  <ModalHeader closeButton>Location  
                      <Button  style={{marginLeft: "310px"}} variant="contained" color="primary" 
                      onClick={() => setlocationModal(false) }>
                             CLOSE
                         </Button>  
                  </ModalHeader>
              
                  <MapContainer
              lat={+event.latitude}
              long={+event.longitude}
            />              
             </Modal>
             <Modal isOpen={showModal}>
            <ModalHeader>{event.title}</ModalHeader>
            <ModalBody>
              <img src={event.img} alt="" />
              <b>Summary:</b><p>{event.summary}</p>
              <b>Event Date:</b><h4>{event.startdate}</h4>
              <b>Event Price:</b><h4>{event.price}</h4><br/>
              <a href={event.read_more} className="btn btn-info">Visit Website</a>
            </ModalBody>
            <ModalFooter>
              <Button outline color="danger"  onClick ={() =>setshowModal(false)
               }>
                CLOSE
              </Button>
            </ModalFooter>
          </Modal>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Summary:</Typography>
          <Typography paragraph>
           {event.summary}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

