import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profileActions';
import { get } from 'https';
import {
    Button, Snackbar,
    SnackbarContent
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import { sendFriendRequest, checkFriendshipStatus } from '../../actions/friendActions';
import SearchUsers from "../dashboard/SearchUsers";
let myEmail = ''

class Friend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedEmail: [],
            friendEmail: [],
            friendName: '',
            friendImage: '',
            status: '',
            msg: false
        };
        this.props.getProfile(this.props.match.params.email);
        //this.addFriend = this.addFriend.bind(this);
        let friendData = {
            loggedEmail: this.props.auth.user.email,
            friendEmail: this.props.match.params.email
        }
        this.props.checkFriendshipStatus(friendData);

    }

    render() {
        const { friendStatus } = this.props.friends;
        console.log("friendStatus", friendStatus)
        const { user } = this.props.auth;
        myEmail = user.email;
        const { profile } = this.props.users;
        return (
            <div className="container">
                {profile && profile.map((value, index) => {
                    return (
                        <div className="profile-friend-page">
                            <div className="page-header header-filter">
                                <div className="main main-raised">
                                    <div className="profile-content">
                                        <div className="container">
                                            <div className="row m-4 view-friends">
                                                <div className="w-75">
                                                    <div className="friend-profile">
                                                        <div className="avtar float-left m-auto">
                                                            {/* <div className="avtarImg" style={{backgroundImage: `url(${userImageUrl})`}}></div> */}
                                                            <div className="avtarImg" style={{ backgroundImage: `url(${value.imageUrl})` }}>></div>
                                                        </div>
                                                        <div className="name float-left">
                                                            <h2 className="title text-capitalize font-weight-bold text-priamry">{value.handle}</h2>
                                                            {/* <Link to="/updateProfile" className="btn btn-lg btn-danger btn-sm">Edit Profile</Link> */}
                                                            <div className="description text-center m-5">
                                                                <p className="text-capitalize">{}</p>
                                                                <h6 className="w-100"><span className="text-muted">Lives at:</span> <b className="bold">{value.location}</b> </h6>
                                                                {
                                                                    friendStatus === 'Add Friend' ? <button className="btn btn-lg btn-primary btn-sm mr-2"
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                msg: true
                                                                            })
                                                                            const request = ({
                                                                                loggedEmail: this.props.auth.user.email,
                                                                                friendEmail: this.props.match.params.email,

                                                                            })
                                                                            this.props.sendFriendRequest(request)
                                                                            setTimeout(function () { window.location.reload(); }, 1e3);
                                                                        }}> Add Friend </button> : <button className="btn btn-lg btn-primary btn-sm mr-2">{friendStatus}</button>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                                {/* <div className="w-25" style={{ height: "65vh", overflow: "auto" }}>
                                                    <h4 className="text-primary">Search Friends</h4>
                                                    <SearchUsers />
                                                </div> */}
                                            </div>
                                            <div className="row m-4">
                                                <h6 className="w-100"><span className="text-muted">Interests:</span> <b className="bold">{value.interests}</b> </h6>
                                                <h6 className="w-100"><span className="text-muted">Address:</span> <b className="bold">{value.address}</b> </h6>
                                                <h6 className="w-100"><span className="text-muted">Date Of Birth:</span> <b className="bold">{value.birthday}</b> </h6>
                                                <h6 className="w-100"><span className="text-muted">Email:</span> <b className="bold">{value.email}</b> </h6>

                                                {/* <h6 className="w-100">Interests: <b className="text-white bold">{value.interests}</b> </h6>
                                                    <h6 className="w-100">Address: <b className="text-white bold">{value.address}</b> </h6>
                                                    <h6 className="w-100">Date Of Birth: <b className="text-white bold">{value.birthday}</b></h6>
                                                    <h6 className="w-100">Email: <b className="text-white bold">{value.email}</b></h6> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                autoHideDuration={3000}
                                open={this.state.msg}
                                onClose={() => {
                                    this.setState({
                                        msg: false
                                    });
                                }}
                            >
                                <SnackbarContent
                                    style={{
                                        backgroundColor: this.state.msg
                                            ? "green"
                                            : ""
                                    }}
                                    message={
                                        this.state.msg
                                            ? "Friend Request Sent"
                                            : ""
                                    }
                                />
                            </Snackbar>

                            {/* <p className="lead text-muted">Welcome {user.email} </p>
                            <h4>Name: {value.email}</h4>
                            <button className="btn btn-lg btn-danger btn-sm mr-2"
                                onClick={() => {
                                    this.setState({
                                        loggedEmail: user.email,
                                        friendEmail: value.email,
                                        status: 'sendRequest'
                                    })
                                    this.addFriend()
                                }}> Add Friend
                            </button> */}
                        </div>
                    )
                })
                }

            </div>

        )

    }

}

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users,
    friends: state.friends
});
export default connect(mapStateToProps, { getProfile, sendFriendRequest, checkFriendshipStatus })(Friend);