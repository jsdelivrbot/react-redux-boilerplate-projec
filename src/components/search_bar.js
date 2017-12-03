import React, {Component} from 'react';

class SearchBar extends Component {
  constructor (props) {
    super (props);

    this.state = { term: 'Starting value'};
  }
  render () {
    return (
      <div className="search-bar">
      <input
        value={this.state.term}
        onChange={ event => {
          this.onInputChange(event.target.value);
        }}/>
      <br/>Value of the input: <br/>{this.state.term}
    </div>
      );
  }

  onInputChange (term) {
    this.setState( { term });
    this.props.onSearchTermChanged(term);
  }
}

export default SearchBar;
