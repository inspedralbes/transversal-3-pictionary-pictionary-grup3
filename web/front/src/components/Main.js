function Main() {
    return (
      <div>
        <header>
        <div className="logo">
            <h1>Pinturillo</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Jugar ahora</a></li>
                <li><a href="#">Instrucciones</a></li>
                <li><a href="#">Comentarios</a></li>
            </ul>
        </nav>
        </header>
        <main>
        <section className="hero">
            <h2>Juega, dibuja y diviértete</h2>
            <a href="#" className="cta-button">Jugar ahora</a>
        </section>
        <section className="instructions">
            <h3>¿Cómo jugar?</h3>
            <ol>
                <li>Selecciona una sala de juego.</li>
                <li>Espera a que comience el juego.</li>
                <li>Dibuja la palabra que se te asignó.</li>
                <li>Adivina las palabras de los demás jugadores.</li>
            </ol>
        </section>
        <section className="comments">
            <h3>Comentarios</h3>
            <blockquote>
                <p>"Me encanta este juego, es muy divertido y adictivo"</p>
                <footer>- Juan Pérez</footer>
            </blockquote>
            <blockquote>
                <p>"Es genial para jugar con amigos y familiares en línea"</p>
                <footer>- María González</footer>
            </blockquote>
            <blockquote>
                <p>"Las salas son muy variadas y siempre encuentras una que te gusta"</p>
                <footer>- Carlos Gómez</footer>
            </blockquote>
        </section>
        </main>
        <footer>
            <p>&copy; 2023 Pinturillo</p>
        </footer>
      </div>
    )
  }
  
  export default Main;    