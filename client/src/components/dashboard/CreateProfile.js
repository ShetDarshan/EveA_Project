import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles, getProfile } from '../../actions/profileActions';
let userEmail,userName,userCreated = ""
class CreateProfile extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getProfile(user.email);
  }
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {

    let { imagePreviewUrl } = this.state;
    const { profile } = this.props.users;
    let final = profile.map(values => {
      userEmail = values.email;
      userName  = values.handle;
      userCreated = values.createdAt;
    });
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }
    return (
      <div class="content" style={{ backgroundColor: "#fafafa" }}>
        <div class="well well-sm page-title" style={{ fontWeight: "bold", marginLeft: "219px", fontSize: "xx-large" }}>Profile</div>
        <table class="table" style={{ width: "80px", align: "center", marginLeft: "219px" }}>
          <tbody >
            <tr>
              <td class="text-right">email:</td>
              <td style={{ textAlign: "left" }}><b>{userEmail}</b></td>
            </tr>
            <tr>
              <td class="text-right">User Name:</td>
              <td style={{ textAlign: "left" }}><b>{userName}</b></td>
            </tr>
          </tbody>
        </table>
        <br />
        <label for="iconFormControlInput1" style={{ color: "white" }}>imagePreviewUrl</label>
        <form enctype="multipart/form-data" style={{ color: "white" }}>
          <input type="file" name="file1" />
          <br />
        </form>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  //getting the user list from profileReducer and auth from authReducer
  users: state.users,
  auth: state.auth

});
export default connect(mapStateToProps, { getAllProfiles, getProfile })(CreateProfile);;