import React from 'react';
import Link from "react-router-dom";

const NavbarMenu = () => {
  return (
    <header>
      <div className="logo">
        <h1><Link to='/'>Pinturillo</Link></h1>
      </div>
      <nav>
        <ul>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/createGame'>Game</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarMenu;