
// Weather API functions using WeatherAPI.com
class WeatherService {
  
  // Fetch comprehensive weather data with fallback logic
  static async fetchWeather(lat, lon, locationName = '') {
    try {
      // Try precise coordinates first
      let weather = await this._fetchFromAPI(lat, lon);
      
      if (!weather) {
        console.log('Precise location failed, trying city-level data...');
        
        // If hyperspecific fails, try to get city coordinates
        if (locationName) {
          const cityCoords = await this._getCityCoordinates(locationName);
          if (cityCoords) {
            weather = await this._fetchFromAPI(cityCoords.lat, cityCoords.lon);
          }
        }
        
        // Final fallback to nearest major city
        if (!weather) {
          const nearestCity = this._getNearestMajorCity(lat, lon);
          weather = await this._fetchFromAPI(nearestCity.lat, nearestCity.lon);
        }
      }
      
      return weather;
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  }
  
  static async _fetchFromAPI(lat, lon) {
    const params = new URLSearchParams({
      key: CONFIG.WEATHER_API_KEY,
      q: `${lat.toFixed(4)},${lon.toFixed(4)}`,
      days: 4,
      aqi: 'yes',
      alerts: 'yes'
    });
    
    const response = await fetch(`${CONFIG.WEATHER_API_BASE}/forecast.json?${params}`);
    if (!response.ok) throw new Error('Weather API request failed');
    
    const data = await response.json();
    return this._formatWeatherData(data);
  }
  
  static _formatWeatherData(data) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast;
    
    return {
      location: {
        name: location.name,
        region: location.region,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        timezone: location.tz_id,
        localtime: location.localtime
      },
      current: {
        temp: Math.round(current.temp_c),
        feels_like: Math.round(current.feelslike_c),
        condition: current.condition.text,
        icon: current.condition.icon,
        code: current.condition.code,
        wind_speed: current.wind_kph,
        wind_dir: current.wind_dir,
        wind_degree: current.wind_degree,
        pressure: current.pressure_mb,
        precip: current.precip_mm,
        humidity: current.humidity,
        cloud: current.cloud,
        uv: current.uv,
        vis: current.vis_km,
        gust: current.gust_kph
      },
      air_quality: current.air_quality ? {
        co: current.air_quality.co,
        no2: current.air_quality.no2,
        o3: current.air_quality.o3,
        so2: current.air_quality.so2,
        pm2_5: current.air_quality.pm2_5,
        pm10: current.air_quality.pm10,
        us_epa_index: current.air_quality['us-epa-index'],
        gb_defra_index: current.air_quality['gb-defra-index']
      } : null,
      astronomy: forecast.forecastday[0].astro,
      forecast: forecast.forecastday.slice(1, 4).map(day => ({
        date: day.date,
        day: {
          maxtemp: Math.round(day.day.maxtemp_c),
          mintemp: Math.round(day.day.mintemp_c),
          avgtemp: Math.round(day.day.avgtemp_c),
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
          code: day.day.condition.code,
          maxwind: day.day.maxwind_kph,
          totalprecip: day.day.totalprecip_mm,
          avghumidity: day.day.avghumidity,
          uv: day.day.uv
        },
        astro: day.astro
      })),
      alerts: data.alerts?.alert || []
    };
  }
  
  static async _getCityCoordinates(locationName) {
    try {
      const cityName = locationName.split(',')[0].split(' ')[0];
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)},Ethiopia&limit=1`);
      const results = await res.json();
      
      if (results.length > 0) {
        return {
          lat: parseFloat(results[0].lat),
          lon: parseFloat(results[0].lon)
        };
      }
    } catch (error) {
      console.error('City coordinates fetch error:', error);
    }
    return null;
  }
  
  static _getNearestMajorCity(lat, lon) {
    const majorCities = [
      { name: 'Addis Ababa', lat: 9.0320, lon: 38.7469 },
      { name: 'Dire Dawa', lat: 9.5903, lon: 41.8663 },
      { name: 'Mekelle', lat: 13.4967, lon: 39.4755 },
      { name: 'Adama', lat: 8.5401, lon: 39.2676 },
      { name: 'Awassa', lat: 7.0623, lon: 38.4776 },
      { name: 'Bahir Dar', lat: 11.6008, lon: 37.3906 },
      { name: 'Jimma', lat: 7.6712, lon: 36.8342 }
    ];
    
    let nearest = majorCities[0];
    let minDistance = this._calculateDistance(lat, lon, nearest.lat, nearest.lon);
    
    majorCities.forEach(city => {
      const distance = this._calculateDistance(lat, lon, city.lat, city.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = city;
      }
    });
    
    return nearest;
  }
  
  static _calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  static getAirQualityText(index) {
    const aqi = {
      1: { text: 'Good', color: '#00E400' },
      2: { text: 'Moderate', color: '#FFFF00' },
      3: { text: 'Unhealthy for Sensitive', color: '#FF7E00' },
      4: { text: 'Unhealthy', color: '#FF0000' },
      5: { text: 'Very Unhealthy', color: '#8F3F97' },
      6: { text: 'Hazardous', color: '#7E0023' }
    };
    return aqi[index] || { text: 'Unknown', color: '#888' };
  }
}


