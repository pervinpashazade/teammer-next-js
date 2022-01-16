import auth, {user} from "../get_auth";
import {LOGIN , SET_DATA} from './actions';

const initialState = {
    isAuth: auth,
    user : user,
    subscribe_viewed : false
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN :
            return {
                isAuth: action.payload
            }
        case SET_DATA :
            return {
                ...state,
                [action.key] : action.data
            }
        default :
            return state;
    }
}
export default reducers;