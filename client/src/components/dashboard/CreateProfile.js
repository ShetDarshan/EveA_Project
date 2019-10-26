import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getAllProfiles,getProfile} from '../../actions/profileActions';
class CreateProfile extends Component {
  componentDidMount() {
    console.log("inside create profile getprofiles")
    this.props.getProfile();
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
    let $imagePreview = null;
    console.log("here")
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      //   <div>
      //     <h1>Test</h1>
      //   </div>

      <div class="content" style={{ backgroundColor: "#fafafa" }}>
        <div class="well well-sm page-title" style={{ fontWeight: "bold", marginLeft: "219px", fontSize: "xx-large" }}>Profile</div>
        <table class="table" style={{ width: "80px", align: "center", marginLeft: "219px" }}>
          <tbody >



            <tr>
              <td class="text-right">Father's Name:</td>
              <td style={{ textAlign: "left" }}><b>Mr. Kartar Singh</b></td>


            </tr>

            <tr>
              <td class="text-right">Mother's Name:</td>
              <td style={{ textAlign: "left" }}><b>Mrs. Sukhwinder kaur</b></td>


            </tr>

            <tr>
              <td class="text-right">Marital Status:</td>
              <td style={{ textAlign: "left" }}><b>Married</b></td>


            </tr>

            <tr>
              <td class="text-right">Workplace:</td>
              <td style={{ textAlign: "left" }}><b>G.S.S.D.G.S Khalsa College Patiala, Punjab, India</b></td>


            </tr>

            <tr>
              <td class="text-right">Job Status:</td>
              <td style={{ textAlign: "left" }}><b>Assistant Professor </b></td>


            </tr>

            <tr>
              <td class="text-right">Department:</td>
              <td style={{ textAlign: "left" }}><b>PG Department of Computer Sciences </b></td>


            </tr>

            <tr>
              <td class="text-right">Experience:</td>
              <td style={{ textAlign: "left" }}><b>Teaching:10 Years<br />Development:4 Years</b></td>


            </tr>

            <tr>
              <td class="text-right">Skills:</td>
              <td style={{ textAlign: "left" }}><b>HTML,CSS,Bootstrap,PHP,Mysql,Javascript,JQuery</b></td>


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
      //   {/* <h2>Profile</h2>
      //   <hr></hr>

      // <form onSubmit={this._handleSubmit}>
      //   <input type="file" onChange={this._handleImageChange} />
      //   <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
      // </form>
      // {$imagePreview} */}


    )
  }

}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(mapStateToProps,{getAllProfiles,getProfile})(CreateProfile);;