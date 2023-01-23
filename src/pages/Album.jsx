import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends Component {
  state = {
    id: '',
    listadeMusica: [],
    album: '',
    loading: true,
  };

  componentDidMount() {
    this.musicas();
  }

  musicas = async () => {
    const { match: { params: { id } } } = this.props;
    const Api = await getMusics(id);
    this.setState({
      id: Api[0].artistName,
      album: Api[0].collectionName,
      listadeMusica: Api.filter((musica) => musica.kind === 'song'),
      loading: false,
    });
  };

  render() {
    const { id, listadeMusica, album, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <p data-testid="album-name">{album}</p>
            <p data-testid="artist-name">{id}</p>
            <p>
              {
                listadeMusica.map((musica, index) => (
                  <MusicCard key={ index } musica={ musica } />))
              }
            </p>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
