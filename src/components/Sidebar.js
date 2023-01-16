import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
  render() {
    return (
      <>
        <h4>
          <Link to="/">Login</Link>
        </h4>
        <nav>
          {/* <Link to="/search">Search</Link> */}
          <Link to="/album/:id">Album</Link>
          {/* <Link to="/favorites">Favorites</Link> */}
          {/* <Link to="/profile">Profile</Link> */}
          <Link to="/profile/edit">ProfileEdit</Link>
        </nav>
      </>
    );
  }
}

export default Sidebar;
