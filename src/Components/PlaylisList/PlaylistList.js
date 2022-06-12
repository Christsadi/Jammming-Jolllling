import React from 'react';
import './PlaylistList.css';
import PlaylistListItem from '../playlistListItem/PlaylistListItem';
import Spotify from '../../util/Spotify';

class playlistList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      playlistList : [],                      
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    Spotify.getUserPlaylists();
  }
  
  render(){
    return (
      <div className="PlaylistList">
        { 
        this.state.playlistList.map(playlist => {
              return <PlaylistListItem 
              playlist={playlist.playlistName} 
                key={playlist.playlistId} />
            }) 
            }
      </div>
    )
  }
}

export default playlistList;