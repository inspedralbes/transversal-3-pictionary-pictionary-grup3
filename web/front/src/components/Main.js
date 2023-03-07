import logo from '../logoPictoboom.png';

function Main() {
    return (
      <div>
        <main>
            <section className="mainSection">
                <div>
                    <img src={logo} className="mainSection__logo" alt="logo" />
                </div>
                <div className="mainSection__playSection">
                    <h2>Hit play, choose your role and have fun</h2>
                    <a href="#" className="playSection_playButton">Jugar ahora</a>
                </div>

                <div class="mainSection__instructionsSection">
                    <ul className="instructionsSection_instructions">
                        <li><a href="#">INSTRUCCIONES</a></li>
                    </ul>
                </div>

                
            </section>
        </main>
        <footer>
            <p>&copy; 2023 Pinturillo</p>
        </footer>
      </div>
    )
  }
  
  export default Main;    