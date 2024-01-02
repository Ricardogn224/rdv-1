import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {

    function initMap() {
      // Create a map centered at a specific location
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.866667, lng: 2.333333 },
        zoom: 12
      });

    }

    // Ensure that the Google Maps API has loaded before calling initMap
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className='map'>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  )

    ;
}

export default Map;
