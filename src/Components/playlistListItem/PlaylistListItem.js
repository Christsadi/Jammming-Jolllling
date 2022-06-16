import React from 'react';
import './PlaylistListItem.css';

class playlistListItem extends React.Component {

   render(){
    return (
        <div className="playlistListItem">
            <h3 playlist={this.props.listName}>{this.props.listName}</h3>
        </div>
    )
  }
  
}



export default playlistListItem;