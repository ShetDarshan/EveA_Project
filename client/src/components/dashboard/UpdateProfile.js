import React, { Component } from 'react'
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import { getAllProfiles, getProfile, updateProfile } from '../../actions/profileActions';
import firebase from 'firebase';
import noPic from '../../img/noPic.jpg';
import { isNull } from 'util';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// import { url } from 'inspector';
let userEmail, userName, userCreated, userId = ""
class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            image: '',
            imageURL: '',
            progress: 0,
            selectedDate: new Date('2000-01-01T00:00:00')
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);

    }
    //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    handleDateChange = date => {
        this.setState({
            selectedDate: date
        });
    };
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
    handleUploadStart = () => {
        this.setState({
            progress: 0
        })
    }
    handleUploadSuccess = filename => {
        this.setState({
            image: filename,
            progress: 100
        })
        firebase.app().storage("gs://evea-prj.appspot.com").ref('avatars').child(userId).child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: url
            }))

    }


    render() {

        // let { imagePreviewUrl } = this.state;
        // const { profile } = this.props.users;
        // if (profile) {
        //   profile.map(values => {
        //     userEmail = values.email;
        //     userName  = values.handle;
        //     userCreated = values.createdAt;
        //     userId = values.userId;
        //   });
        // }
        return (
            <div className="container" style={{ borderStyle: "inset", backgroundColor: "#fafafa", marginTop: "50px" }}>
                
                <form>

                    <div class="form-row">
                        <div className="col-md-6 mb-3">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="exampleFormControlInput1">Name</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>

                    </div>
                    <div class="form-row">
                        <div className="col-md-6 mb-3">
                            <label for="exampleFormControlSelect1">Gender</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Enter BirthDate"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect2">Select Your Intrests</label>
                        <select multiple class="form-control" id="exampleFormControlSelect2">
                            <option>EDUCATION,BUSINESS & TECHNOLOGY</option>
                            <option>MUSIC & ENTERTAINMENT</option>
                            <option>HEALTH & SPORTS</option>
                            <option>COMMUNITY & FESTIVALS</option>
                            <option>FOOD & DRINK</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Add Bio</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Add a profile picture below</label><br />
                        <FileUploader
                            accept="image/*"
                            name='image'
                            storageRef={firebase.app().storage("gs://evea-prj.appspot.com").ref('avatars').child(userId)}
                            onUploadStart={this.handleUploadStart}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    <button class="btn btn-primary" type="submit">Update Details</button>
                </form>
            </div>
        )
    }

}

// const mapStateToProps = state => ({
//   //getting the user list from profileReducer and auth from authReducer
//   users: state.users,
//   auth: state.auth

// })
export default UpdateProfile;