import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    listaFavoritos: [],
    loading: true,
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      listaFavoritos: await getFavoriteSongs(),
      loading: false,
    });
  };

  getRemoveFavorites = (id) => {
    const { listaFavoritos } = this.state;
    const remove = listaFavoritos.filter((musica) => musica.trackId !== id);
    this.setState({
      listaFavoritos: remove,
    });
  };

  render() {
    const { listaFavoritos, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <div>
            {
              listaFavoritos.map((musica) => (
                <MusicCard
                  key={ musica.trackId }
                  musica={ musica }
                  favorito
                  // handleChange={ () => this.getRemoveFavorites(musica) }
                  remove={ this.getRemoveFavorites }
                />
              ))
            }
          </div>
        )}
      </div>
    );
  }
}
export default Favorites;
