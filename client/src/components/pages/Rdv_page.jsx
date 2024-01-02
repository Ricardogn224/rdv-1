import React from 'react'
import '../../assets/css/rdv_page.css';
import medecinImage from '../../assets/portrait-docteur.jpg';
import Navbar_user_log from '../Navbar_user_log';
import Footer from '../Footer';

function Rdv_page() {
    return (
        <>
            <Navbar_user_log />
            <div className='flex space-between rdv_list'>
                <div className='zone_old_rdv '>
                    <div className='title ma-20'>
                        <p>Mes rendez-vous passés  </p>
                    </div>

                    <div class="encadre ma-20">
                        <div class="proposition">
                            <img src={medecinImage} alt="" />
                            <div class="text">
                                <h4>Sandrine IRIGOYEN</h4>
                                <p>Gynécologue obstétricienne</p>
                            </div>
                        </div>
                        <div class="proposition">
                            <div className='zone-vide '></div>
                            <div class="text">
                                <h4>Le détail de votre rendez-vous</h4>
                                <p>Jeudi 10 Août 2023 : 12h40</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='zone_new_rdv '>
                    <div className='title ma-20'>
                        <p>Mes rendez-vous à venir   </p>
                    </div>

                    <div class="encadre ma-20">
                        <div class="proposition">
                            <img src={medecinImage} alt="" />
                            <div class="text">
                                <h4>Sandrine IRIGOYEN</h4>
                                <p>Gynécologue obstétricienne</p>
                            </div>
                        </div>
                        <div class="proposition">
                            <div className='zone-vide '></div>
                            <div class="text">
                                <h4>Le détail de votre rendez-vous</h4>
                                <p>Jeudi 10 Août 2023 : 12h40</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}

export default Rdv_page;