import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import PlaylistList from '../PlaylisList/PlaylistList';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults : [],
      playlistName : 'New Playlist',
      playlistTracks : [],
      playlistList : [],
      PlaylistId: null,
                        };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.selectPlaylist= this.selectPlaylist.bind(this);
  }

  selectPlaylist(id) {
    Spotify.getPlaylist(id).then(listId => {
      this.setState({
                      playlistName: listId.name,
                      playlistTracks: listId.tracks,
                      playlistId:listId.id
                    });
    });
  }

  componentWillMount() {
    Spotify.getUserPlaylists().then(playlistList => {
      this.setState({playlistList});
    });
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id)
    
    this.setState({playlistTracks: tracks});

  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } 
      tracks.push(track);
      this.setState({playlistTracks: tracks});
  }
  
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    
    Spotify.savePlaylist(this.state.playlistName,trackUris,this.state.playlistId)
    .then( () => {this.setState({playlistName: 'New Playlist',
                  playlistTracks: []
      })
    })

  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render(){
    return (
      <div>
        <h1>
          Jo<span className='highlight'>lll</span>ing
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search}/>
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} 
                           searchResults={this.state.searchResults}/>
            <Playlist onRemove={this.removeTrack} 
                      playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
           </div>
           <PlaylistList selectPlaylist={this.selectPlaylist} playlistList={this.state.playlistList}/> 
           
        </div>
      </div>
    )
  }
}



export default App;
