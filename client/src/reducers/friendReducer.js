import { SEND_REQ, GET_REQ, FRNDS_GOING, FRNDS_LIST,CHK_FRND } from '../actions/types';
const initialState = {
    friend: [],
    request: [],
    friendsGoing: [],
    friendsList: [],
    friendStatus : '',
    loading: false
};

export default function (state = initialState, action) {

    switch (action.type) {
        case SEND_REQ:
            return {
                ...state,
                friend: action.payload,
                loading: false
            };
        case GET_REQ:
            return {
                ...state,
                request: action.payload,
                loading: false
            };
        case FRNDS_GOING:
            return {
                ...state,
                friendsGoing: action.payload,
                loading: false
            };
        case FRNDS_LIST:
            return {
                ...state,
                friendsList: action.payload,
                loading: false
            };
        case CHK_FRND:
            return {
                ...state,
                friendStatus: action.payload,
                loading: false
            };
        default:
            return state;

    }

}