import React from 'react';
import './PlaylistListItem.css';

class playlistListItem extends React.Component {
  constructor (props) {
    super(props);

       this.select = this.select.bind(this);

  }

  select(){
    this.props.selectList(this.props.listName)
  }

   render(){
    return (
        <div className="playlistListItem" onClick={this.select}>
            <h3 playlist={this.props.listName} onClick={this.select}>{this.props.listName}</h3>
        </div>
    )
  }
  
}



export default playlistListItem;