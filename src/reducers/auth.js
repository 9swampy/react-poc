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
            // console.log(action.payload.params);
            // const credential = new GoogleFirebase.GoogleAuthProvider.credential(
            //     id_token
            //   );

            // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
            //     clientId:
            //       "my-client-id-goes-here.google.apps.com",
            //   });
            
            //   React.useEffect(() => {
            //     if (response?.type === "success") {
            //       const { id_token } = response.params;
            //       const credential = new GoogleFirebase.GoogleAuthProvider.credential(
            //         id_token
            //       );
            //     }
            //   }, [response]);
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
        case "ID-TOKEN":
            newState.id_token = action.payload;
            console.log(`Signed-In: ${state.isAuthenticated} with token`);
        default:
            console.log(`Signed-In: ${state.isAuthenticated}`);
            console.log(state.token);
            console.log(state.id_token);
            return state;
    }
}

export default authReducer;