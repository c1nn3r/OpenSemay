
// Weather display management with enhanced features
class WeatherDisplay {
  constructor() {
    this.currentLanguage = localStorage.getItem('OpenSemay-language') || 'en';
    this.translations = {
      en: {
        location: 'Location',
        condition: 'Condition',
        feelsLike: 'Feels like',
        wind: 'Wind',
        humidity: 'Humidity',
        pressure: 'Pressure',
        visibility: 'Visibility',
        uvIndex: 'UV Index',
        airQuality: 'Air Quality',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        moonPhase: 'Moon Phase',
        forecast: '3-Day Forecast',
        today: 'Today',
        tomorrow: 'Tomorrow',
        dayAfter: 'Day After',
        thirdDay: 'Third Day',
        moreInfo: 'More Info',
        alerts: 'Weather Alerts',
        searchPlaceholder: 'Search your location... (e.g. Mekanisa)'
      },
      am: {
        location: 'ቦታ',
        condition: 'ሁኔታ',
        feelsLike: 'ይሰማል',
        wind: 'ንፋስ',
        humidity: 'እርጥበት',
        pressure: 'ግፊት',
        visibility: 'እይታ',
        uvIndex: 'የፀሐይ ጨረር',
        airQuality: 'የአየር ጥራት',
        sunrise: 'ፀሐይ መውጣት',
        sunset: 'ፀሐይ መግባት',
        moonPhase: 'የጨረቃ ጊዜ',
        forecast: '3-ቀን ትንበያ',
        today: 'ዛሬ',
        tomorrow: 'ነገ',
        dayAfter: 'ከነገ በኋላ',
        thirdDay: 'ሦስተኛ ቀን',
        moreInfo: 'ተጨማሪ መረጃ',
        alerts: 'የአየር ሁኔታ ማስጠንቀቂያዎች',
        searchPlaceholder: 'ቦታዎን ይፈልጉ...'
      }
    };
  }
  
  display(locationName, data) {
    // Store data globally for language switching
    window.currentWeatherData = data;
    window.currentLocationName = locationName;
    
    const panel = document.getElementById('weatherPanel');
    panel.classList.add('active');
    
    const t = this.translations[this.currentLanguage];
    const weather = data.current;
    const location = data.location;
    
    // Set background image for location header only
    const locationHeader = document.getElementById('locationName');
    const weatherCode = weather.code;
    const keywords = CONFIG.WEATHER_BACKGROUNDS[weatherCode] || 'weather,ethiopia,landscape';
    const bgImageUrl = `https://source.unsplash.com/600x150/?${keywords}`;
    
    locationHeader.style.backgroundImage = `url('${bgImageUrl}')`;
    locationHeader.style.backgroundSize = 'cover';
    locationHeader.style.backgroundPosition = 'center';
    locationHeader.style.backgroundRepeat = 'no-repeat';
    
    // Weather icon from API or fallback to emoji
    const weatherIcon = CONFIG.WEATHER_ICONS[weather.code] || '🌤️';
    
    // Update main weather info
    document.getElementById('locationName').innerHTML = `
      <div style="color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
        <div style="font-size: 1.3rem; font-weight: bold;">${location.name}</div>
        <div style="font-size: 0.8rem; opacity: 0.9;">${location.region}, ${location.country}</div>
        <a href="https://en.wikipedia.org/wiki/${encodeURIComponent(location.name)}" 
           target="_blank" 
           style="color: #00ff88; text-decoration: none; font-size: 0.7rem; display: inline-block; margin-top: 0.5rem; border: 1px solid #00ff88; padding: 0.2rem 0.4rem; transition: all 0.2s;">
           ${t.moreInfo} ↗
        </a>
      </div>
    `;
    
    document.getElementById('weatherDesc').innerHTML = `${weatherIcon} ${weather.condition}`;
    document.getElementById('temp').innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.4rem;">
        <span style="font-size: 2rem;">${weather.temp}°C</span>
        <span style="font-size: 0.9rem; opacity: 0.8;">${t.feelsLike} ${weather.feels_like}°C</span>
      </div>
    `;
    
    // Enhanced weather details
    document.getElementById('wind').innerHTML = `
      <span class="weather-icon">💨</span>${t.wind}: ${Math.round(weather.wind_speed)} km/h ${weather.wind_dir}
    `;
    document.getElementById('humidity').innerHTML = `
      <span class="weather-icon">💧</span>${t.humidity}: ${weather.humidity}%
    `;
    document.getElementById('pressure').innerHTML = `
      <span class="weather-icon">🌡️</span>${t.pressure}: ${Math.round(weather.pressure)} hPa
    `;
    
    // Additional weather info
    const additionalInfoContainer = document.querySelector('.additional-info');
    let additionalInfoHTML = `
      <div class="weather-item">
        <div><span class="weather-icon">👁️</span>${t.visibility}: ${weather.vis} km</div>
      </div>
      <div class="weather-item">
        <div><span class="weather-icon">☀️</span>${t.uvIndex}: ${weather.uv}</div>
      </div>
    `;
    
    // Air quality info
    if (data.air_quality) {
      const aqiInfo = WeatherService.getAirQualityText(data.air_quality.us_epa_index);
      additionalInfoHTML += `
        <div class="weather-item">
          <div><span class="weather-icon">🌬️</span>${t.airQuality}: 
            <span style="color: ${aqiInfo.color}; font-weight: bold;">${aqiInfo.text}</span>
          </div>
        </div>
      `;
    }
    
    // Astronomy info
    if (data.astronomy) {
      additionalInfoHTML += `
        <div class="weather-item">
          <div><span class="weather-icon">🌅</span>${t.sunrise}: ${data.astronomy.sunrise}</div>
        </div>
        <div class="weather-item">
          <div><span class="weather-icon">🌇</span>${t.sunset}: ${data.astronomy.sunset}</div>
        </div>
        <div class="weather-item">
          <div><span class="weather-icon">🌙</span>${t.moonPhase}: ${data.astronomy.moon_phase}</div>
        </div>
      `;
    }
    
    // Weather alerts
    if (data.alerts && data.alerts.length > 0) {
      additionalInfoHTML += `
        <div class="weather-item alert-item">
          <div><span class="weather-icon">⚠️</span>${t.alerts}:</div>
          ${data.alerts.map(alert => `
            <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(255,0,0,0.2); font-size: 0.8rem;">
              <strong>${alert.headline}</strong><br>
              <small>${alert.desc}</small>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    additionalInfoContainer.innerHTML = additionalInfoHTML;
    
    // Enhanced forecast
    const days = [t.tomorrow, t.dayAfter, t.thirdDay];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    data.forecast.forEach((dayData, i) => {
      const date = new Date(dayData.date);
      const dayName = dayNames[date.getDay()];
      const forecastIcon = CONFIG.WEATHER_ICONS[dayData.day.code] || '🌤️';
      
      document.getElementById(`day${i + 1}`).innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 600; font-size: 0.85rem;">${dayName}</div>
            <div style="font-size: 0.75rem; opacity: 0.8;">${days[i]}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.3rem;">${forecastIcon}</div>
            <div style="font-size: 0.7rem;">${dayData.day.condition}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 600; font-size: 0.85rem;">${dayData.day.maxtemp}°</div>
            <div style="opacity: 0.7; font-size: 0.8rem;">${dayData.day.mintemp}°</div>
          </div>
        </div>
      `;
    });
    
    // Background is now handled via sidebar header image only
  }
  
  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('OpenSemay-language', lang);
    
    const t = this.translations[lang];
    
    // Update language toggle button instantly
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
      langToggle.textContent = CONFIG.LANGUAGES[lang].flag;
    }
    
    // Update search placeholder
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
      searchInput.placeholder = t.searchPlaceholder;
    }
    
    // Update tab labels
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length >= 2) {
      tabButtons[0].textContent = t.today;
      tabButtons[1].textContent = t.forecast;
    }
    
    // Re-render current weather data if available
    const weatherPanel = document.getElementById('weatherPanel');
    if (weatherPanel.classList.contains('active') && window.currentWeatherData) {
      this.display(window.currentLocationName, window.currentWeatherData);
    }
  }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  window.mapManager = new MapManager();
  window.weatherDisplay = new WeatherDisplay();
  
  // Set initial language from storage
  const savedLang = localStorage.getItem('OpenSemay-language') || 'en';
  window.weatherDisplay.setLanguage(savedLang);
  
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      button.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });
  
  // Language toggle functionality - instant switching
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentLang = window.weatherDisplay.currentLanguage;
      const newLang = currentLang === 'en' ? 'am' : 'en';
      window.weatherDisplay.setLanguage(newLang);
    });
  }
  
  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark-theme');
      themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('locationSearch');
  searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (!query) return;
      
      const success = await window.mapManager.searchLocation(query);
      if (success) {
        e.target.value = '';
      } else {
        alert('Location not found. Please try a different search term.');
      }
    }
  });
  
  // Auto-locate user on load
  window.mapManager.autoLocateUser();
});
