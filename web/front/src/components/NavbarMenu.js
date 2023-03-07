import React from 'react';

const NavbarMenu = () => {
  return (
    <header>
      <div className="logo">
        <h1><a href='/'>Pinturillo</a></h1>
      </div>
      <nav>
        <ul>
          <li><a href='/login'>Login</a></li>
          <li><a href='/register'>Register</a></li>
          <li><a href='/createGame'>Game</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavbarMenu;