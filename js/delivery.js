// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoianQ5Nzg0IiwiYSI6ImNtYXVmNXV2ZTA4b2Eya214bzhhMzlpeGUifQ.sH1M9i1yYRpiNn6pivyJmQ';

// Initialize the map centered in the US
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-98.5795, 39.8283],
  zoom: 4,
  projection: 'mercator'
});

let marker = null;
let storeMarker = null;
let selectedCoords = null;
let selectedPlaceName = null;

const deliveryType = document.getElementById('deliveryType');
const validateBtn = document.getElementById('validateBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
let estimationInfo = document.getElementById('estimationInfo');
let estimationText = document.getElementById('estimationText');

// Add "Enter" button 
const enterBtn = document.createElement('button');
enterBtn.id = 'enterBtn';
enterBtn.textContent = 'Calculate Time';


const geocoderContainer = document.getElementById('geocoder-container');
geocoderContainer.parentNode.insertBefore(enterBtn, geocoderContainer.nextSibling);

// Initialize MapboxGeocoder
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Enter your address',
  countries: 'us',
  types: 'address,place,postcode',
  bbox: [-125, 24, -66, 50],
  limit: 5,
  mapboxgl: mapboxgl,
  marker: false
});
document.getElementById('geocoder-container').appendChild(geocoder.onAdd(map));

// Generate 200 fake store locations across US
const fakeStores = Array.from({ length: 200 }, () => {
  const lng = -125 + Math.random() * (66 - (-125)); // US longitude range
  const lat = 24 + Math.random() * (49 - 24);       // US latitude range
  return { lng, lat };
});

// Helper to get closest store
function getClosestStore([lng, lat]) {
  let closest = null;
  let minDist = Infinity;

  fakeStores.forEach(store => {
    const d = Math.sqrt((store.lng - lng) ** 2 + (store.lat - lat) ** 2);
    if (d < minDist) {
      minDist = d;
      closest = store;
    }
  });

  return closest;
}

// Draw route using Mapbox Directions API
function drawRoute(start, end) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const route = data.routes[0].geometry;
      const duration = Math.round(data.routes[0].duration / 60); // Convert seconds to minutes

      // Remove existing route if present
      if (map.getLayer('route')) map.removeLayer('route');
      if (map.getSource('route')) map.removeSource('route');

      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5
        }
      });

      // Add green marker for store
      if (storeMarker) storeMarker.remove();
      storeMarker = new mapboxgl.Marker({ color: 'green' }).setLngLat(end).addTo(map);

      // Update estimation info based on delivery type
      updateEstimationInfo(duration, end);
    })
    .catch(err => {
      console.error('Error drawing route:', err);
      alert('Error fetching directions.');
    });
}

// Function to update the estimation info
function updateEstimationInfo(duration, storeLocation) {
  const type = deliveryType.value;
  
  if (type === 'delivery') {
    // Add 15 minutes for preparation
    const totalTime = duration + 15;
    estimationText.innerHTML = `<strong>Estimated Delivery Time:</strong> ${totalTime} minutes`;
  } else {
    // For carryout, show store address and 10 minute preparation time
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${storeLocation[0]},${storeLocation[1]}.json?access_token=${mapboxgl.accessToken}`)
      .then(res => res.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const storeAddress = data.features[0].place_name;
          estimationText.innerHTML = `<strong>Pickup Location:</strong> ${storeAddress}<br><strong>Ready In:</strong> 10 minutes`;
        }
      });
  }
  
  estimationInfo.style.display = 'block';
}

// On address selected from geocoder
geocoder.on('result', (e) => {
  selectedCoords = e.result.center;
  selectedPlaceName = e.result.place_name;

  if (marker) marker.remove();
  marker = new mapboxgl.Marker().setLngLat(selectedCoords).addTo(map);
  map.flyTo({ center: selectedCoords, zoom: 14 });
});

// On input cleared
geocoder.on('clear', () => {
  if (marker) marker.remove();
  selectedCoords = null;
  selectedPlaceName = null;
});

// Use current location
currentLocationBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported.');
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    selectedCoords = [longitude, latitude];

    if (marker) marker.remove();
    marker = new mapboxgl.Marker().setLngLat(selectedCoords).addTo(map);
    map.flyTo({ center: selectedCoords, zoom: 14 });

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`)
      .then(res => res.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          selectedPlaceName = data.features[0].place_name;
          geocoder.setInput(selectedPlaceName);
        } else {
          alert('Could not find address for current location.');
        }
      })
      .catch(() => {
        alert('Error fetching address.');
      });
  }, () => {
    alert('Unable to retrieve your location.');
  });
});

// Add event listener for delivery type change
deliveryType.addEventListener('change', function() {
  if (selectedCoords) {
    const nearest = getClosestStore(selectedCoords);
    drawRoute(selectedCoords, [nearest.lng, nearest.lat]);
  }
});

// "Enter" button draws the route
enterBtn.addEventListener('click', () => {
  if (!selectedCoords) {
    showValidationError('Please enter a valid address.');
    return;
  }
  const nearest = getClosestStore(selectedCoords);
  drawRoute(selectedCoords, [nearest.lng, nearest.lat]);
});

// "Continue" button proceeds to cart
validateBtn.addEventListener('click', () => {
  if (!selectedCoords || !selectedPlaceName) {
    showValidationError('Please select a valid address from the suggestions.');
    return;
  }

  // Get the nearest store
  const nearest = getClosestStore(selectedCoords);
  
  localStorage.setItem('deliveryInfo', JSON.stringify({
    address: selectedPlaceName,
    coords: { lat: selectedCoords[1], lng: selectedCoords[0] },
    type: deliveryType.value,
    storeCoords: { lat: nearest.lat, lng: nearest.lng },
    estimatedTime: estimationText.textContent
  }));

  window.location.href = 'cart.html';
});

function showValidationError(message) {
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'location-error-overlay';
  popup.innerHTML = `
    <div class="location-error-content">
      <div class="error-icon">
        <i class='bx bx-error-circle'></i>
      </div>
      <p>${message}</p>
      <button id="errorCloseBtn">OK</button>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(popup);
  
  // Show with animation
  setTimeout(() => {
    popup.classList.add('active');
    popup.querySelector('.location-error-content').classList.add('active');
  }, 10);
  
  // Add event listener to close button
  document.getElementById('errorCloseBtn').addEventListener('click', function() {
    popup.classList.remove('active');
    popup.querySelector('.location-error-content').classList.remove('active');
    setTimeout(() => {
      popup.remove();
    }, 300);
  });
}
