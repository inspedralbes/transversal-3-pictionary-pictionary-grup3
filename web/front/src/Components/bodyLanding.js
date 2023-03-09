import logo from "../style/logoPictoboom.png";
import logoSmall from "../style/logoPictoboom small.png";
import bgImage from "../style/webBackground.png"

export default function bodyLanding(){
    return(
        <div className="relative px-6 lg:px-8 bg-[url('../style/webBackground.png')]">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-10">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            </div>
            <div className="text-center ">
            <img className="h-256 m-[auto]" src={logoSmall} alt="Logo" />
              <p className="mt-6 text-lg leading-8 text-gray-600">
                ¡PictoBoom, where your drawings come alive!<br></br>
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/joinGame"
                  className="default-button text-sm font-semibold text-gray-100 hover:text-white shadow-sm hover:pink-to-orange-gr hover:outline-none outline-orange-600"
                >
                  Play now!
                </a>
                <a href="/login" className="text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none">
                  Are you the teacher?
                </a>
              </div>
            </div>
          </div>
        </div>
    )
}