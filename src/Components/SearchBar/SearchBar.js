import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.enterButton = this.enterButton.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({term: event.target.value})
  }

  enterButton(event) {
    if (event.key === "Enter") {
        this.search();
    }
}

  render(){
    return (
        <div className='SearchBar'>
            <input placeholder="Enter A Song, Album, or Artist" 
                  onChange={this.handleTermChange} onKeyPress={this.enterButton}/>
            <button onClick = {this.search} className='SearchButton'>SEARCH</button>
        </div>
    )
  }
}

export default SearchBar;