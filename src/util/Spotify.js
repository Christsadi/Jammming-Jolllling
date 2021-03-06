import tools from "./tools";
// const clientId = process.env.REACT_APP_SPOTIFY_API; For some reason when i try with it this way it does not work
const clientId = tools.apiKey;
const redirectUri = tools.uri;

let accessToken;
let userId;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 
            // check for acces token match
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

            if(accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1];
                accessToken = accessToken.replace("=", ""); // troubleshooting
                const expiresIn = Number(expiresInMatch[1]);
                
                //this code, wipes the access token and URL parameters.
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;

            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                window.location = accessUrl;
            }  

    },

    search(term){
        const accessToken = Spotify.getAccessToken();

       return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: { Authorization: `Bearer ${accessToken}` } //sends request
        }).then(response => { //converts response object to JSON
    		    return response.json();
  		}).then(jsonResponse => { // handles success
            if (!jsonResponse.tracks) { // code to excute with jsonResponse
                return []
          }
          return jsonResponse.tracks.items.map(track =>({
              id: track.id,
              name: track.name,
              artists: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
          }))
        }) 
    },
    
    savePlaylist(name, trackUris, playId) {
        if (!name || !trackUris.length || !playId){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };    

        return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {
            userId = response;

            if (playId){
                return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playId}`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                 })
            }   return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`,
	                            {
	                                headers: headers,
                                    method: 'POST',
	                                body: JSON.stringify({name: name})
                                 }) //sends request
            .then(response => { //converts response object to JSON
    			return response.json();
  		    }) 
	        .then(jsonResponse => { // handles success
		     const playlistId = jsonResponse.id;
             return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
	                            {
	                                headers: headers,
                                    method: 'POST',
	                                body: JSON.stringify({uris: trackUris})
                                 }) //sends request
        
        })
        })

    },

    getCurrentUserId(){
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        if (userId) {
            return userId;
          }

          return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then((response) => response.json())
            .then((jsonResponse) => {
              userId = jsonResponse.id;
              return userId;
            })        
    },

    getUserPlaylists(){
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {
            userId = response;

          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                            {
                                headers: headers,
                                method: 'GET',
                            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                const playlistJson = jsonResponse.items
                if (!playlistJson) { // code to excute with jsonResponse
                    return [];
              }
              return playlistJson.map(playlist =>({
                playlistId: playlist.id,
                playlistName: playlist.name,
            
            }))   
        })
        })
    },

    getPlaylist(id){
        
        if (!id){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };    

        return Promise.resolve(Spotify.getCurrentUserId()).then((response) => {
            userId = response;

                return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`,
	                            {
	                                headers: headers,
                                    method: 'GET',
                                 }) //sends request
	        .then(response => { //converts response object to JSON
    			return response.json();
  		    }) 
	        .then((jsonResponse) => {
                const trackJson = jsonResponse.tracks
                if (!trackJson) { // code to excute with jsonResponse
                    return [];
              }
              return trackJson.map(track =>({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))   
        })
        })
    }

}



export default Spotify;