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

            

    },

    search(term){
        const accessToken = Spotify.getAccessToken();

       return fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: {Authorization: `Bearer ${accessToken}`}
          }) //sends request

	.then(response => { //converts response object to JSON
  		if (response.ok) {
    			return response.json();
  		} 
  		throw new Error('Request failed!'); //handles errors
		}, 
		networkError => console.log(networkError.message)) // handles errors
	.then(jsonResponse => { // handles success
		return jsonResponse;}) // code to excute with jsonResponse
    }
  }



export default Spotify;