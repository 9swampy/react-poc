import logo from './logo.svg';
import './App.css';
import { GoogleLogin  } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, signOut, setWeatherForecast, idToken } from './actions';

import { useGoogleLogin } from '@react-oauth/google';

function App() {
  const responseMessage = (response) => {
    // let decoded = jwt_decode(resp?.credential);
    // const email = decoded?.email;
    // const name = decoded?.name;
    // console.log(email);
    // console.log(name);
    // console.log(decoded.id_token);
    //var id_token = googleUser.getAuthResponse().id_token;
    //console.log(id_token);
    //let idToken = response.credential.getGoogleIdToken();
    //console.log(idToken);
    dispatch(signIn(response));
  };

  const errorMessage = (error) => {
    dispatch(signOut());
    console.log(error);
  };

  const loginCode = useGoogleLogin({
      onSuccess: async tokenResponse => {
        console.log(tokenResponse);
        await loginIdToken(tokenResponse.code);
      },
      flow: 'auth-code',
    });

  const loginIdToken = async (authCode) => {
    try {
      console.log(`code: ${authCode}`);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: JSON.stringify({ 
            grant_type: "authorization_code",
            code: {authCode},
            redirect_uri: "https://localhost:7165/signin-oidc",
          })
      };

      const response = await fetch('https://accounts.google.com/o/oauth2/token', requestOptions);
      const data = await response.json();
      console.log(data);
      dispatch(idToken(data.id_token));
    } catch (error) {
      console.log(error);
    }
  }

  const loginToken = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  
  const counter = useSelector(state => state.counter);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const fetchAuthWeatherForecast = async () => {
    try {
       const response = await fetch(
          'https://localhost:7165/AuthWeatherForecast'
       );
       const data = await response.json();
       dispatch(setWeatherForecast(data));
    } catch (error) {
       console.log(error);
    }
 };

  const fetchWeatherForecast = async () => {
  try {
      const response = await fetch(
          'https://localhost:7165/WeatherForecast'
      );
      const data = await response.json();
      dispatch(setWeatherForecast(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {isAuthenticated
          ? <button onClick={() => dispatch(signOut())}>Log out</button>
          : <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap
             />
        }

        <button onClick={() => loginCode()}>
            Sign in code with Google 🚀{' '}
        </button>
        <button onClick={() => loginToken()}>
            Sign in token with Google 🚀{' '}
        </button>

        <button onClick={() => dispatch(increment(2))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={fetchWeatherForecast}>Fetch WeatherForecast</button>
        <button onClick={fetchAuthWeatherForecast}>Fetch Auth WeatherForecast</button>
        <h1>Counter: {counter}</h1>
      </header>
    </div>
  );
}

export default App;
