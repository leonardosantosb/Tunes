import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export class Profile extends Component {
  state = {
    user: {},
    loading: true,
  };

  componentDidMount() {
    this.userApi();
  }

  userApi = async () => {
    this.setState({
      user: await getUser(),
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    if (loading) return (<Loading />);
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          <img
            data-testid="profile-image"
            src={ user.image }
            alt="imagem do usuário"
          />
        </div>
        <div>
          <p>Nome</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p>E-mail</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p>Descrição</p>
          <p>{user.description}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
