import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {
    // Définit initMap globalement
    window.initMap = function() {
      // Crée une carte centrée sur une localisation spécifique
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.866667, lng: 2.333333 },
        zoom: 12
      });
    }

    // Assurez-vous que l'API Google Maps a chargé avant d'appeler initMap
    if (window.google && window.google.maps) {
      window.initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPU-OosEVRDqMDpiNzZkMtlH0FQPLbp9s&callback=initMap';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className='map'>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
}

export default Map;
