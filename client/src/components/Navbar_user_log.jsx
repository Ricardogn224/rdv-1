import React, { useState, useEffect } from 'react'

function Navbar_user_log() {

  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem('username'); // Replace 'username' with the actual key you used
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // The empty array ensures this effect runs only once when the component mounts


  return (
    <nav className="navbar p-20">
      <div className="flex space-between ma-80">
        <div>
          <h1>
            <a className="logo-link" href="/search_page">Médecin sur rdv</a>
          </h1>
        </div>
        <div>
          <ul className="flex phone_nav_options phone_flex-column">
            <li><a href="/register_pro">Vous êtes un professionnel ?</a></li>
            <li><a href="/rdv_page">{username || 'user'} </a></li> {/* Display the username if available, otherwise 'user' */}
            <li>Se déconnecter</li>
          </ul>
        </div>
      </div>

    </nav>
  )
}

export default Navbar_user_log