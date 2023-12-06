import React from 'react'

function Navbar_user_log() {
  return (
    <nav className="navbar p-20">
        <div className="flex space-between ma-80">
            <div>
                <h1>
                    <a className="logo-link" href="">Médecin sur rdv</a>
                </h1>
            </div>
            <div>
                <ul class="flex ">
                    <li><a className="btn-action " href="">Vous êtes un professionnel ?</a></li>
                    <li>user</li>
                    <li>Se déconnecter</li>
                </ul>
            </div>
        </div>

    </nav>
  )
}

export default Navbar_user_log