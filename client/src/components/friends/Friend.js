import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profileActions';
import { get } from 'https';
import { Button } from '@material-ui/core';
import { Alert } from 'reactstrap';
import { sendFriendRequest } from '../../actions/friendActions';
let myEmail = ''

class Friend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedEmail: [],
            friendEmail: [],
            status: ''
        };
        this.props.getProfile(this.props.match.params.email);
        
    }
    addFriend = () => {
        this.props.sendFriendRequest(this.state)
    }

    render() {

        //console.log("selectedUser:",selectedUser)

        const { user } = this.props.auth;
        console.log("user:", user)
        myEmail = user.email;
        const { profile } = this.props.users;
        console.log("profile:", profile)
        return (
            <div className="container">
                { profile && profile.map((value, index) => {
                    return (
                        <div className="profile-page">
                              <div className="page-header header-filter">
                                    <div className="main main-raised">
                                        <div className="profile-content">
                                            <div className="container">
                                                <div className="row m-4">
                                                    <div className="w-75">
                                                    <div className="profile">
                                                        <div  className="avtar float-left">
                             {/* <div className="avtarImg" style={{backgroundImage: `url(${userImageUrl})`}}></div> */}
                                                           <div className="avtarImg" style={{backgroundImage: `url(${value.imageUrl})`}}>></div>
                                                        </div>
                                                        <div className="name float-left">
                                                                <h3 className="title text-capitalize">{value.handle}</h3>
                                                                {/* <Link to="/updateProfile" className="btn btn-lg btn-danger btn-sm">Edit Profile</Link> */}
                                                                <div className="description text-center mt-2">
                                                                    <p className="text-capitalize">{}</p>
                                                                    <h6> Lives at: <b className="text-white bold">{value.location}</b> </h6>
                                                                    <h6> Joined at: <b className="text-white bold">{}</b> </h6>
                                                                    <button className="btn btn-lg btn-danger btn-sm mr-2"
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            loggedEmail: user.email,
                                                                            friendEmail: value.email,
                                                                            status: 'sendRequest'
                                                                        })
                                                                        this.addFriend()
                                                                    }}> Add Friend
                                                                </button>
                                                                </div>
                                                            </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="row m-4">
                                                    <h6 className="w-100">Interests: <b className="text-white bold">{value.interests}</b> </h6>
                                                    <h6 className="w-100">Address: <b className="text-white bold">{value.address}</b> </h6>
                                                    <h6 className="w-100">Date Of Birth: <b className="text-white bold">{value.birthday}</b></h6>
                                                    <h6 className="w-100">Email: <b className="text-white bold">{value.email}</b></h6>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
</div> 
                                                        

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
    users: state.users
});
export default connect(mapStateToProps, { getProfile, sendFriendRequest })(Friend);
