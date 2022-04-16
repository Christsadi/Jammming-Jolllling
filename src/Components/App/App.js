import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults : [{name:'name1', artist:'artist1', album:'album1', id:1}, 
                       {name:'name2', artist:'artist2', album:'album2', id:2}, 
                       {name:'name3', artist:'artist3', album:'album3', id:3}],
       playlistName : 'My Playlist',
       playlistTracks : [{PlaylistName:'name1', playlistArtist:'artist1', playlistAlbum:'album1', id:4}, 
                         {PlaylistName:'name2', playlistArtist:'artist2', playlistAlbum:'album2', id:5}, 
                         {PlaylistName:'name3', playlistArtist:'artist3', playlistAlbum:'album3', id:6}],
                        };
       this.addTracks = this.addTracks.bind(this);
       
  }

  addTracks(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track);
    }
    
    this.setState({playlistTracks: tracks});
  }

  render(){
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar/>
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
           </div>
        </div>
      </div>
    )
  }
}



export default App;
