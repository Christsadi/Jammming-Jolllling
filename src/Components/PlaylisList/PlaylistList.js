import React from 'react';
import './PlaylistList.css';
import PlaylistListItem from '../playlistListItem/PlaylistListItem';

class playlistList extends React.Component {
  
  render(){
    return (
      <div className="playlistList">
        <h2>Your List of Playlists</h2>
        <>
        { 
        this.props.playlistList.map(playlist => {
              return <PlaylistListItem 
              selectList={this.props.selectPlaylist}
              listName={playlist.playlistName} 
                key={playlist.playlistId} />
            }) 
            }
            </>
      </div>
    )
  }
}

export default playlistList;