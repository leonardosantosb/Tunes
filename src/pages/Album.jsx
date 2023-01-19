import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    id: '',
    listadeMusica: [],
    album: '',
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
    });
  };

  render() {
    const { id, listadeMusica, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
