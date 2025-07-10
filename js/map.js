
// Map management class
class MapManager {
  constructor() {
    this.map = null;
    this.marker = null;
    this.init();
  }
  
  init() {
    // Initialize map with loosened bounds
    const bounds = [
      [CONFIG.ETHIOPIA_BOUNDS.south, CONFIG.ETHIOPIA_BOUNDS.west],
      [CONFIG.ETHIOPIA_BOUNDS.north, CONFIG.ETHIOPIA_BOUNDS.east]
    ];
    
    this.map = L.map('map', {
      minZoom: CONFIG.MAP_CONFIG.minZoom,
      maxZoom: CONFIG.MAP_CONFIG.maxZoom,
      maxBounds: bounds,
      maxBoundsViscosity: 0.7, // More lenient
      zoomControl: false // Remove default zoom controls
    }).setView(CONFIG.MAP_CONFIG.center, CONFIG.MAP_CONFIG.zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Fit map to Ethiopia bounds
    this.map.fitBounds(bounds);
    
    // Add click handler
    this.map.on('click', (e) => this.handleMapClick(e));
  }
  
  async handleMapClick(e) {
    const { lat, lng } = e.latlng;
    
    // Check if click is within loosened Ethiopia bounds
    if (lat < CONFIG.ETHIOPIA_BOUNDS.south || lat > CONFIG.ETHIOPIA_BOUNDS.north || 
        lng < CONFIG.ETHIOPIA_BOUNDS.west || lng > CONFIG.ETHIOPIA_BOUNDS.east) {
      alert('Please select a location within Ethiopia');
      return;
    }
    
    this.addMarker(lat, lng);
    
    try {
      const locationName = await this.reverseGeocode(lat, lng);
      const weather = await WeatherService.fetchWeather(lat, lng, locationName);
      
      if (weather && weather.current) {
        window.weatherDisplay.display(locationName, weather);
      } else {
        alert('Unable to fetch weather data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Error fetching weather data. Please check your connection.');
    }
  }
  
  addMarker(lat, lng, isUserLocation = false) {
    if (this.marker) this.map.removeLayer(this.marker);
    
    // Create simple circular marker
    const markerHtml = `
      <div style="
        width: 20px;
        height: 20px;
        background: ${isUserLocation ? '#007fff' : '#00ff88'};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        position: relative;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `;
    
    const customIcon = L.divIcon({
      html: markerHtml,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    
    this.marker = L.marker([lat, lng], {icon: customIcon}).addTo(this.map);
  }
  
  async reverseGeocode(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&zoom=18`);
      if (!res.ok) throw new Error('Geocoding request failed');
      
      const data = await res.json();
      const addr = data.address || {};
      
      // Build detailed location name with hierarchy
      let locationParts = [];
      
      // Add specific location details (most specific first)
      if (addr.house_number && addr.road) {
        locationParts.push(`${addr.house_number} ${addr.road}`);
      } else if (addr.road) {
        locationParts.push(addr.road);
      }
      
      // Add neighborhood/suburb details
      if (addr.suburb) {
        locationParts.push(addr.suburb);
      } else if (addr.neighbourhood) {
        locationParts.push(addr.neighbourhood);
      } else if (addr.quarter) {
        locationParts.push(addr.quarter);
      }
      
      // Add city
      const city = addr.city || addr.town || addr.village || addr.municipality;
      if (city && !locationParts.some(part => part.includes(city))) {
        locationParts.push(city);
      }
      
      // Add country
      if (addr.country) {
        locationParts.push(addr.country);
      }
      
      // Return formatted location or fallback
      return locationParts.length > 0 ? locationParts.join(', ') : "Unknown Location";
    } catch (error) {
      console.error('Geocoding error:', error);
      return "Unknown Location";
    }
  }
  
  async searchLocation(query) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)},Ethiopia&limit=5&countrycodes=et`);
      if (!res.ok) throw new Error('Search request failed');
      
      const results = await res.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        this.map.setView([lat, lon], 12);
        this.addMarker(lat, lon);
        
        const locationName = await this.reverseGeocode(lat, lon);
        const weather = await WeatherService.fetchWeather(lat, lon, locationName);
        
        if (weather && weather.current) {
          window.weatherDisplay.display(locationName, weather);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Search error:', error);
      return false;
    }
  }
  
  async autoLocateUser() {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Check if user is in Ethiopia (loosened bounds)
        if (latitude >= CONFIG.ETHIOPIA_BOUNDS.south && latitude <= CONFIG.ETHIOPIA_BOUNDS.north && 
            longitude >= CONFIG.ETHIOPIA_BOUNDS.west && longitude <= CONFIG.ETHIOPIA_BOUNDS.east) {
          
          this.map.setView([latitude, longitude], 10);
          this.addMarker(latitude, longitude, true);
          
          try {
            const locationName = await this.reverseGeocode(latitude, longitude);
            const weather = await WeatherService.fetchWeather(latitude, longitude, locationName);
            
            if (weather && weather.current) {
              window.weatherDisplay.display(locationName, weather);
            }
          } catch (error) {
            console.error('Auto-location weather fetch error:', error);
          }
        }
      },
      (error) => console.log('Geolocation not available or denied')
    );
  }
}
