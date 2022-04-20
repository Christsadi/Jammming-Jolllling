import React from 'react';
const clientId = '6f0f305fca8b4660b99c8184aead6cb5';
const redirectUri ='http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 
            // check for acces token match
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/)

            if(accessTokenMatch && expirationTimeMatch){
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expirationTimeMatch[1]);
                
                //this code, wipes the access token and URL parameters.
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;

            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?
                           client_id=${clientId}&response_type=token&scope=playlist-modify-public&
                           redirect_uri=${redirectUri}`;
                
                windows.location = accessUrl;
            }

            




    }
  }



export default Spotify;