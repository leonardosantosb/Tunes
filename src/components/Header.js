import React, { Component } from 'react';
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
    if (loadingHeader) {
      return (<Loading />);
    }
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {nameUser}
        </div>
      </header>
    );
  }
}

export default Header;
