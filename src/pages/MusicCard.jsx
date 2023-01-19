import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favorito: false,
  };

  async componentDidMount() {
    this.setState({
      favorito: await this.favoritemusic(),
    });
  }

  handleChange = async ({ target: { checked } }) => {
    const { musica } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(musica);
    } else {
      await removeSong(musica);
    }
    this.setState({
      loading: false,
      favorito: checked,
    });
  };

  favoritemusic = async () => {
    const { musica: { trackName } } = this.props;
    const favoritas = await getFavoriteSongs();
    return (
      favoritas.map((favorita) => favorita.trackName).includes(trackName)
    );
  };

  render() {
    const { musica } = this.props;
    const { loading, favorito } = this.state;
    if (loading) return (<Loading />);
    return (
      <div>
        <p>{musica.trackName}</p>
        <audio data-testid="audio-component" src={ musica.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${musica.trackId}` }
            onChange={ this.handleChange }
            checked={ favorito }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.objectOf(
    PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ],
    ),
  ).isRequired,
};

export default MusicCard;
