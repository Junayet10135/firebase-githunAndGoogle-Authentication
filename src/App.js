import './App.css';
import app from './firebase.init';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';

const auth =getAuth(app);

function App() {

  const [user, setUser] =useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGithubSignOut =()=>{
    signOut(auth)
      .then(() => {
        
      })
      .catch(error => {
        
      })

  }

  const handleGithubSignIn = () => {
      signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error =>{
        console.error(error);
      })
  }

  const handleGoogleSignOut =() =>{
      signOut(auth)
      .then( () =>{
        setUser({});
      })
      .catch(error =>{
        setUser({});
      })
  }
   

  const handleGoogleSignIn = () =>{

      signInWithPopup(auth, googleProvider)
      .then(result =>{
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error =>{
        console.log(error);
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <div>
          <button onClick={handleGoogleSignOut}>Google Sign out</button>
          <button onClick={handleGithubSignOut}>github Sign out</button>
        </div>
      :
      <div>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleGithubSignIn}>Github Sign in</button>
      </div>
      }
      <h2>{user.displayName}</h2>
    </div>
  );
}

export default App;
