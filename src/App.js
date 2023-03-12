import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, signOut } from './actions';



function App() {
  const responseMessage = (response) => {
    dispatch(signIn(response));
  };

  const errorMessage = (error) => {
    dispatch(signOut());
    console.log(error);
  };

  const counter = useSelector(state => state.counter);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

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
            useOneTap />
        }

        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <h1>Counter: {counter}</h1>
      </header>
    </div>
  );
}

export default App;
