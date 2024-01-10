import React from 'react';
import '../../assets/css/navbar_admin.css';
import '../../assets/css/admin.css';


function Navbar() {
    return (
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="icon-dashboard"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Tableau de bord</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/rdv" className="nav-link">
                <i className="icon-appointment"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">RDV</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Patients</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Messages</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Traitements</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Documents</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Paiements</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Paramètre</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/patients" className="nav-link">
                <i className="icon-patients"></i> {/* Remplacez par l'icône de votre choix */}
                <span className="link-text">Deconnexion</span>
              </a>
            </li>
            {/* Continuez à ajouter d'autres éléments de navigation ici */}
          </ul>
        </nav>
      );
}

export default Navbar;



