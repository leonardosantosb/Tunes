import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disableButtonSearch: true,
    };
  }

  onInputChange2 = ({ target }) => {
    const textLength = 2;
    const { value, name } = target;
    if (value.length < textLength) {
      this.setState({
        [name]: value,
        disableButtonSearch: true,
      });
    } else {
      this.setState({
        [name]: value,
        disableButtonSearch: false,
      });
    }
  };

  render() {
    const { disableButtonSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="pesquisa">
            <input
              name="textSearch"
              id="textSearch"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.onInputChange2 }
            />
          </label>
          <button
            type="button"
            id="btpesquisa"
            data-testid="search-artist-button"
            disabled={ disableButtonSearch }
          >
            Pesquisar

          </button>
        </form>
      </div>

    );
  }
}

export default Search;
