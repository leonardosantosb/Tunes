import React, { Component } from 'react';
import Header from '../components/Header';

export class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
      </div>
    );
  }
}

export default Profile;
