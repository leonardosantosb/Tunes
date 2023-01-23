import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      loadingHeader: true,
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const name = await getUser();
    this.setState({
      loadingHeader: false,
      nameUser: name.name,
    });
  };

  render() {
    const { nameUser, loadingHeader } = this.state;

    return (
      <header data-testid="header-component">
        {(loadingHeader) ? <Loading /> : (
          <div data-testid="header-user-name">
            {nameUser}
          </div>
        )}
        <nav>
          <Link to="/" data-testid="link-to-login">Login</Link>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <Link to="/profile/edit" data-testid="link-to-profile-edit">Editar perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
