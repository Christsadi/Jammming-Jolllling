import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import PlaylistList from '../PlaylisList/PlaylistList';

class SearchResults extends React.Component {
  
  render(){
    return (
      <div className="SearchResults">
          <h2>Results</h2>
          <TrackList isRemoval={false} onAdd={this.props.onAdd} tracks={this.props.searchResults}/> 
          <h2>Your List of Playlists</h2>
          <PlaylistList /> 

      </div>
    )
  }
}

export default SearchResults;