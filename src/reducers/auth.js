import { googleLogout } from '@react-oauth/google';

const authReducer = (state = {
    isAuthenticated: false,
    token: null
}, action) => {
    const newState = { ...state, modalOpen: true }
    switch (action.type) {
        case "SIGN-IN":
            console.log('Sign-In');
            console.log(action.payload);
            newState.isAuthenticated = true;
            newState.token = action.payload;
            console.log(`Signed-In: ${newState.isAuthenticated}`);
            return newState;
        case "SIGN-OUT":
            newState.isAuthenticated = false;
            newState.token = null;
            googleLogout();
            console.log(`Signed-In: ${state.isAuthenticated}`);
            return newState;
        default:
            console.log(`Signed-In: ${state.isAuthenticated}`);
            console.log(state.token);
            return state;
    }
}

export default authReducer;