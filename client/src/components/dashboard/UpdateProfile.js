import React, { Component } from 'react'
import { connect } from 'react-redux';
import FileUploader from 'react-firebase-file-uploader';
import { updateProfile, getProfile } from '../../actions/profileActions';
import firebase from 'firebase';
import { isNull } from 'util';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { array } from 'prop-types';

// import { url } from 'inspector';
let userEmail, userHandle, userlocation, userInterests, userBirthday, userCreated, userId, userBio, userImageUrl, userAddress, userGender = ""

class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            image: '',
            imageURL: "",
            progress: 0,
            birthday: new Date('2000-01-01T00:00:00'),
            gender: "",
            interests: [],
            bio: "",
            address: "",
            location: ""


        };
       
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        const { profile } = this.props.users;
        if (profile) {
            profile.map(values => {
                userEmail = values.email;
                userHandle = values.handle;
                userCreated = values.createdAt;
                userId = values.userId;
                userBio = values.bio;
                userAddress = values.address;
                userInterests = values.interests;
                userlocation = values.location;
                userBirthday = values.birthday;
                userImageUrl = values.imageUrl;
                userGender = values.gender;
            });
        }


    }
    

    //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    handleDateChange = date => {
        this.setState({
            birthday: date
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
    onSubmit = (e) => {
        e.preventDefault();
        const userDetails = {
            email: userEmail,
            userId: userId,
            handle: userHandle,
            gender: this.state.gender ? this.state.gender : userGender,
            birthday: this.state.birthday ? this.state.birthday : userBirthday,
            bio: this.state.bio ? this.state.bio : userBio,
            interests: this.state.interests ? this.state.interests : userInterests,
            address: this.state.address ? this.state.address : userAddress,
            location: this.state.location ? this.state.location : userlocation,
            imageURL: this.state.imageURL ? this.state.imageURL : userImageUrl
        };
        this.props.updateProfile(userDetails);
        this.props.history.push('/profile');
    }
    render() {
        const { address, bio, location, gender, birthday, interests} = this.state;

        const enabled = address.length> 0 && bio.length>0 && location.length>0 && gender.length>0 && birthday.length>0 && interests.length>0;
        return (
            <div className="container border-primary p-2 text-primary updateProfile" style={{ borderStyle: "inset", backgroundColor: "transparent"}}>   
                <Form onSubmit={this.onSubmit}>
                    <Row form className="m-1">
                        <Col md={6} className="">
                            <FormGroup>
                                <Label for="exampleEmail"><b style={{fontSize: "18px" }}>Email</b></Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder={userEmail} disabled />
                            </FormGroup>
                        </Col>
                        <Col md={6} className="">
                            <FormGroup>
                                <Label for="examplePassword"><b style={{fontSize: "18px" }}>User-Id</b></Label>
                                <Input type="password" name="password" id="examplePassword" placeholder={userId} readOnly />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form className="m-1">
                        <Col md={6} className="">
                            <Label for="exampleSelect"><b style={{fontSize: "18px" }}>Gender</b></Label>
                            <Input type="select"
                                value={this.state.gender}
                                onChange={event => {
                                    let gender = event.target.value;
                                    this.setState({
                                        gender: gender
                                    });
                                }}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Input>

                        </Col>
                        <Col md={6} style={{ backgroundColor: "transparent", fontSize: "18px" }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Enter BirthDate"
                                        format="MM/dd/yyyy"
                                        value={this.state.birthday}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Col>
                    </Row>
                    <Row className="m-1">
                        <Col md={6} className="">
                            <FormGroup>
                                <Label for="exampleAddress"><b style={{fontSize: "18px" }}>Address</b></Label>
                                <Input type="text" name="address" id="exampleAddress" placeholder={userAddress}
                                    value={this.state.address}
                                    onChange={event => {
                                        let address = event.target.value;
                                        this.setState({
                                            address: address
                                        });
                                    }}>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="">
                            <Label for="exampleSelect"><b style={{fontSize: "18px" }}>Location</b></Label>
                            <Input type="select"
                                value={this.state.location}
                                onChange={event => {
                                    let location = event.target.value;
                                    this.setState({
                                        location: location
                                    });
                                }}>
                                <option>Dublin City Centre</option>
                                <option>Dublin North</option>
                                <option>Dublin South</option>
                            </Input>
                        </Col>
                    </Row>
                    <FormGroup className="m-3">
                        <Label for="exampleSelectMulti"><b style={{fontSize: "18px" }}>Select Your Interests</b></Label>
                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple
                            value={this.state.interests}
                            onChange={event => {
                                let value = Array.from(event.target.selectedOptions, option => option.value);
                                this.setState({ interests: value });
                            }}>
                            <option>Sports and Health</option>
                            <option>Fashion and Art</option>
                            <option>Education Business and Technology</option>
                            <option>Community and Festivals</option>
                            <option>Music and Entertainment</option>
                        </Input>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <Label for="exampleText"><b style={{fontSize: "18px" }}>Add Bio</b></Label>
                        <Input type="textarea" value={this.state.bio} placeholder="Tell us more about you"
                            onChange={event => {
                                let bio = event.target.value;
                                this.setState({
                                    bio: bio
                                });
                            }}>
                        </Input>
                    </FormGroup>
                    <FormGroup className="m-3">
                    <FileUploader
                        accept="image/*"
                        name='image'
                        storageRef={firebase.app().storage("gs://evea-prj.appspot.com").ref('avatars').child(userId)}
                        onUploadStart={this.handleUploadStart}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                    <Button className="btn btn-primary" ><b>Update Profile</b></Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //getting  auth from authReducer
    auth: state.auth,
    users: state.users,

})

export default connect(mapStateToProps, { updateProfile, getProfile })(withRouter(UpdateProfile));