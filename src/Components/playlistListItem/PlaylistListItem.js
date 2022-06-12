import React from 'react';
import './PlaylistListItem.css';

class playlistListItem extends React.Component {

   render(){
    return (
        <div className="playlistListItem">
            <div className="PlaylistListItem-information">
                <h3>{this.props.playlist.playlistName}</h3>
            </div>
      </div>
    )
  }
  
  // constructor (props) {
  //   super(props);

  //     //  this.addTrack = this.addTrack.bind(this);
  //     //  this.removeTrack = this.removeTrack.bind(this);
       
  // }

  // renderAction(){
  //     if(this.props.isRemoval){
  //         return <button className='Track-action' onClick={this.removeTrack}>-</button>
  //     } else {
  //       return <button className='Track-action' onClick={this.addTrack}>+</button>
  //     }
  // }

  // removeTrack(){
  //   this.props.onRemove(this.props.track)
  // }

  // addTrack(){
  //   this.props.onAdd(this.props.track);
  // }

  // render(){
  //   return (
  //       <div className="Track">
  //           <div className="Track-information">
  //               <h3>{this.props.track.name}</h3>
  //               <p> {this.props.track.artist} | {this.props.track.album} </p>
  //           </div>
  //           {this.renderAction()}
  //     </div>
  //   )
  // }
}



export default playlistListItem;