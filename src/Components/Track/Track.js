import React from 'react';
import './Track.css';

export class Track extends React.Component {
  renderAction(){
      <button className="Track-action">{this.props.isRemoval === true? '-':'+';}</button> 
  }

  render(){
    return (
        <div className="Track">
            <div className="Track-information">
                <h3><!-- track name will go here --></h3>
                <p><!-- track artist will go here--> | <!-- track album will go here --></p>
            </div>
            {this.renderAction}
      </div>
    )
  }
}