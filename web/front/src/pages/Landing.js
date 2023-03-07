import React, { useState } from 'react';
import "./estilos.css";

const Landing = () => {
  return (
    <div>
      <header>
        <h1>Pinturillo</h1>
        <nav>
          <ul>
            <li><a href='/createGame'>Game</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h2>Play, draw and have fun</h2>
          <a href='/createGame'>Play now</a>
        </section>
        <section className="instructions">
          <h3>How to play?</h3>
          <p>1. Select a game room.</p>
          <p>2. Wait for the game to start.</p>
          <p>3. Draw the word assigned to you.</p>
          <p>4. Guess the words of other players.</p>
        </section>
        <section className="comments">
          <h3>Comments</h3>
          <p>"I love this game, it's very fun and addictive"</p>
          <p>"It's great to play with friends and family online"</p>
          <p>"The rooms are very varied and you always find one you like"</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Pinturillo</p>
      </footer>
    </div>
  );
};

export default Landing;
