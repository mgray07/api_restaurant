import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import GreetingPage from './GreetingPage';
import FarewellPage from './FarewellPage';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

let SignInCheck = (props) => {

    console.log('inside signincheck.js')
    console.log(props.signIn)
    console.log(!props.signIn)

    // console.log('changing signin inside signincheck')
    // props.changeSignIn()
    // console.log(props.signIn)
    // console.log(!props.signIn)
    
    let [showLoginButton, setShowLoginButton] = useState(props.signIn);
    let [showLogoutButton, setShowLogoutButton] = useState(!props.signIn);

    
    
    let history = useHistory()
    const responseSignInGoogleSuccess = (response) => {
        console.log('hello in?')
        console.log(response.profileObj)
        //history.push('/GreetingPage')
        //setShowLoginButton(false);
        //setShowLogoutButton(true);
        props.changeSignIn();
        props.changeSignIn2();
        console.log('do we make it here')
        history.push({
            pathname: '/GreetingPage',
            state: { googleID: response.profileObj.googleId , googleValue: response.profileObj.name, googlePicture: response.profileObj.imageUrl }
        });
    }

    const responseSignOutGoogleSuccess = (response) => {
        console.log('hello out?')
        //console.log(response.profileObj)
        //history.push('/GreetingPage')
        // setShowLoginButton(true);
        // setShowLogoutButton(false);
        props.changeSignIn();
        props.changeSignIn2();
        history.push({
            pathname: '/FarewellPage',
            state: { valid: true }
        });
    }

    const responseSignInGoogleFailure = (response) => {
        console.log('Fail ', response)
    }
    
    const responseSignOutGoogleFailure = (response) => {
        console.log('Fail ', response)
    }
    
    
    return  (
    <div>
        <div id='google'>
            {showLoginButton ?
            <GoogleLogin clientId = '279700457129-jutmcs5c0ptfhjh2ss06kq7jki0d38se.apps.googleusercontent.com'
            buttonText = 'Sign In'
            onSuccess = {responseSignInGoogleSuccess}
            onFailure = {responseSignInGoogleFailure}
            // redirectUri = 'http://localhost:3000/GreetingPage/'
            // uxMode="redirect"
            cookiePolicy = 'single_host_origin'/> : null
            }

            {showLogoutButton ?
            <GoogleLogout
            clientId = '279700457129-jutmcs5c0ptfhjh2ss06kq7jki0d38se.apps.googleusercontent.com'
            buttonText = 'Sign Out'
            onLogoutSuccess = {responseSignOutGoogleSuccess}
            onFailure = {responseSignOutGoogleFailure}
            // redirectUri = 'http://localhost:3000/GreetingPage/'
            // uxMode="redirect"
            /> : null
            } 
        </div>

    </div>

    
    
    
    
    
    )        
}

export default SignInCheck
