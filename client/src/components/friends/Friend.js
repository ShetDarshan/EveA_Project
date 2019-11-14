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
            loggedEmail: '',
            friendEmail: '',
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
                        <div>
                        <p className="lead text-muted">Welcome {user.email} </p>
                        <h4>Name: {value.email}</h4>
                        <button
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
