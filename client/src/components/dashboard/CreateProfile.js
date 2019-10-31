import React, { Component } from 'react'
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import { getAllProfiles, getProfile,updateProfile } from '../../actions/profileActions';
import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
// import { url } from 'inspector';
let userEmail,userName,userCreated,userId = ""
class CreateProfile extends Component {

  // componentDidMount() {
  //   // const { user } = this.props.auth;
  //   // this.props.getProfile(user.email);
  //   //console.log("imageURL",this.state.imageURL);
  //   // if(this.state.imageURL) {
  //   //   console.log('calling update');
  //   //   this.props.updateProfile(user.email,this.state.imageURL);
  //   // }
  //   // this.props.updateProfile(user.email,this.state.imageURL);
  //   // console.log("imgUrl",this.state.imageURL);
  // }
  constructor(props) {
    super(props);
    // this.state = {
    //   file: '',
    //   imagePreviewUrl: '',
    //   image: '',
    //   imageURL: '',
    //   progress:0
    // };
    // this._handleImageChange = this._handleImageChange.bind(this);
    // this._handleSubmit = this._handleSubmit.bind(this);
    const { user } = this.props.auth;
    this.props.getProfile(user.email);
  }

  // _handleSubmit(e) {
  //   e.preventDefault();
  //   // TODO: do something with -> this.state.file
  // }

  // _handleImageChange(e) {
  //   e.preventDefault();

  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     this.setState({
  //       file: file,
  //       imagePreviewUrl: reader.result
  //     });
  //   }

  //   reader.readAsDataURL(file)
  // }
  // handleUploadStart = () => {
  //   this.setState({
  //     progress:0
  //   })
  // }
  // handleUploadSuccess = filename => {
  //   this.setState({
  //     image: filename,
  //     progress:100
  //   })
  //   firebase.app().storage("gs://evea-prj.appspot.com").ref('avatars').child(userId).child(filename).getDownloadURL()
  //     .then(url => this.setState({
  //       imageURL:url
  //     }))

  // }
  render() {

    // let { imagePreviewUrl } = this.state;
    const { profile } = this.props.users;
    if (profile) {
      profile.map(values => {
        userEmail = values.email;
        userName  = values.handle;
        userCreated = values.createdAt;
        userId = values.userId;
      });
    }

    return (

      <div className="container" style={{borderStyle: "inset", backgroundColor: "#fafafa",marginTop:"50px" }}>
      <div className="row">{userEmail}</div>
        <img  src={noPic} className="img-fluid" style = {{width: "200px",height:"200px"} }></img>
        <Link to="/updateProfile" className="btn btn-lg btn-info">Update Profile</Link>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  //getting the user list from profileReducer and auth from authReducer
  users: state.users,
  auth: state.auth

})
export default connect(mapStateToProps, { getAllProfiles, getProfile })(CreateProfile);