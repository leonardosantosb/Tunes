import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disableButtonSearch: true,
      respostainput: '',
      pesquisainput: '',
      album: [],
    };
  }

  onInputChange2 = ({ target }) => {
    const textLength = 2;
    const { value, name } = target;
    if (value.length < textLength) {
      this.setState({
        [name]: value,
        disableButtonSearch: true,
        respostainput: value,
      });
    } else {
      this.setState({
        [name]: value,
        disableButtonSearch: false,
        respostainput: value,
      });
    }
  };

  handleclick = () => {
    const { respostainput } = this.state;
    this.setState({
      pesquisainput: respostainput,
    }, async () => {
      const album1 = await searchAlbumsAPI(respostainput);
      this.setState({
        album: album1,
        pesquisainput: respostainput,
        disableButtonSearch: true,
      });
    });
  };

  render() {
    const { disableButtonSearch, album, respostainput, pesquisainput } = this.state;
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
              value={ respostainput }
            />
          </label>
          <button
            type="button"
            id="btpesquisa"
            data-testid="search-artist-button"
            disabled={ disableButtonSearch }
            onClick={ this.handleclick }
          >
            Pesquisar

          </button>
        </form>
        {
          album && album.length > 0 && (
            <div>
              <h2>
                Resultado de álbuns de:
                {' '}
                {pesquisainput}
              </h2>
              { album.map((alb) => (
                <div key={ alb.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${alb.collectionId}` }
                    to={ `/album/${alb.collectionId}` }
                  >
                    <img src={ alb.artworkUrl100 } alt={ alb.collectionName } />
                  </Link>
                  <h3>
                    { alb.collectionName }
                  </h3>
                  <h3>
                    { alb.artistName }
                  </h3>
                </div>
              ))}
            </div>
          )
        }
        {
          album && album.length === 0 && (
            <h1>Nenhum álbum foi encontrado</h1>
          )
        }

      </div>

    );
  }
}

export default Search;
