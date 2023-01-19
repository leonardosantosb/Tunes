import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

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

  getRemoveFavorites = (musica) => {
    this.setState({ loading: true }, async () => {
      await removeSong(musica);
      this.getFavorites();
    });
  };

  render() {
    const { listaFavoritos, loading } = this.state;
    if (loading) return (<Loading />);
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {
            listaFavoritos.map((musica) => (
              <MusicCard
                key={ musica.trackId }
                musica={ musica }
                favorito
                handleChange={ () => this.getRemoveFavorites(musica) }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
