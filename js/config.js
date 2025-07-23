
const CONFIG = {
  // WeatherAPI.com (comprehensive weather data)
  WEATHER_API_KEY: 'ENTER YOUR API KEY HERE',
  WEATHER_API_BASE: 'https://api.weatherapi.com/v1',
  
  // Ethiopia boundaries (loosened)
  ETHIOPIA_BOUNDS: {
    north: 15.2,
    south: 3.0,
    east: 48.5,
    west: 32.5
  },
  
  // Map settings
  MAP_CONFIG: {
    center: [9.03, 38.74],
    zoom: 6,
    minZoom: 5,
    maxZoom: 18
  },
  
  // Weather condition mappings for backgrounds
  WEATHER_BACKGROUNDS: {
    1000: 'clear,sunny,blue,sky,ethiopia', // Sunny
    1003: 'partly,cloudy,sky,ethiopia', // Partly cloudy
    1006: 'cloudy,overcast,ethiopia', // Cloudy
    1009: 'overcast,grey,ethiopia', // Overcast
    1030: 'fog,misty,ethiopia', // Mist
    1063: 'rain,showers,ethiopia', // Patchy rain possible
    1066: 'snow,winter,ethiopia', // Patchy snow possible
    1069: 'sleet,winter,ethiopia', // Patchy sleet possible
    1072: 'drizzle,light,rain,ethiopia', // Patchy freezing drizzle possible
    1087: 'thunderstorm,lightning,ethiopia', // Thundery outbreaks possible
    1114: 'snow,blowing,ethiopia', // Blowing snow
    1117: 'blizzard,snow,ethiopia', // Blizzard
    1135: 'fog,dense,ethiopia', // Fog
    1147: 'fog,freezing,ethiopia', // Freezing fog
    1150: 'drizzle,patchy,ethiopia', // Patchy light drizzle
    1153: 'drizzle,light,ethiopia', // Light drizzle
    1168: 'drizzle,freezing,ethiopia', // Freezing drizzle
    1171: 'drizzle,heavy,freezing,ethiopia', // Heavy freezing drizzle
    1180: 'rain,patchy,light,ethiopia', // Patchy light rain
    1183: 'rain,light,ethiopia', // Light rain
    1186: 'rain,moderate,ethiopia', // Moderate rain at times
    1189: 'rain,moderate,ethiopia', // Moderate rain
    1192: 'rain,heavy,ethiopia', // Heavy rain at times
    1195: 'rain,heavy,ethiopia', // Heavy rain
    1198: 'rain,light,freezing,ethiopia', // Light freezing rain
    1201: 'rain,moderate,heavy,freezing,ethiopia', // Moderate or heavy freezing rain
    1204: 'sleet,light,ethiopia', // Light sleet
    1207: 'sleet,moderate,heavy,ethiopia', // Moderate or heavy sleet
    1210: 'snow,patchy,light,ethiopia', // Patchy light snow
    1213: 'snow,light,ethiopia', // Light snow
    1216: 'snow,patchy,moderate,ethiopia', // Patchy moderate snow
    1219: 'snow,moderate,ethiopia', // Moderate snow
    1222: 'snow,patchy,heavy,ethiopia', // Patchy heavy snow
    1225: 'snow,heavy,ethiopia', // Heavy snow
    1237: 'pellets,ice,ethiopia', // Ice pellets
    1240: 'rain,showers,light,ethiopia', // Light rain shower
    1243: 'rain,showers,moderate,heavy,ethiopia', // Moderate or heavy rain shower
    1246: 'rain,showers,torrential,ethiopia', // Torrential rain shower
    1249: 'sleet,showers,light,ethiopia', // Light sleet showers
    1252: 'sleet,showers,moderate,heavy,ethiopia', // Moderate or heavy sleet showers
    1255: 'snow,showers,light,ethiopia', // Light snow showers
    1258: 'snow,showers,moderate,heavy,ethiopia', // Moderate or heavy snow showers
    1261: 'pellets,ice,showers,light,ethiopia', // Light showers of ice pellets
    1264: 'pellets,ice,showers,moderate,heavy,ethiopia', // Moderate or heavy showers of ice pellets
    1273: 'rain,thundery,patchy,light,ethiopia', // Patchy light rain with thunder
    1276: 'rain,thundery,moderate,heavy,ethiopia', // Moderate or heavy rain with thunder
    1279: 'snow,thundery,patchy,light,ethiopia', // Patchy light snow with thunder
    1282: 'snow,thundery,moderate,heavy,ethiopia' // Moderate or heavy snow with thunder
  },
  
  // Weather icons mapping
  WEATHER_ICONS: {
    1000: '☀️', // Sunny
    1003: '⛅', // Partly cloudy
    1006: '☁️', // Cloudy
    1009: '☁️', // Overcast
    1030: '🌫️', // Mist
    1063: '🌦️', // Patchy rain possible
    1066: '🌨️', // Patchy snow possible
    1069: '🌨️', // Patchy sleet possible
    1072: '🌦️', // Patchy freezing drizzle possible
    1087: '⛈️', // Thundery outbreaks possible
    1114: '❄️', // Blowing snow
    1117: '❄️', // Blizzard
    1135: '🌫️', // Fog
    1147: '🌫️', // Freezing fog
    1150: '🌦️', // Patchy light drizzle
    1153: '🌦️', // Light drizzle
    1168: '🌦️', // Freezing drizzle
    1171: '🌦️', // Heavy freezing drizzle
    1180: '🌦️', // Patchy light rain
    1183: '🌧️', // Light rain
    1186: '🌧️', // Moderate rain at times
    1189: '🌧️', // Moderate rain
    1192: '🌧️', // Heavy rain at times
    1195: '🌧️', // Heavy rain
    1198: '🌧️', // Light freezing rain
    1201: '🌧️', // Moderate or heavy freezing rain
    1204: '🌨️', // Light sleet
    1207: '🌨️', // Moderate or heavy sleet
    1210: '🌨️', // Patchy light snow
    1213: '❄️', // Light snow
    1216: '❄️', // Patchy moderate snow
    1219: '❄️', // Moderate snow
    1222: '❄️', // Patchy heavy snow
    1225: '❄️', // Heavy snow
    1237: '🧊', // Ice pellets
    1240: '🌦️', // Light rain shower
    1243: '🌧️', // Moderate or heavy rain shower
    1246: '🌧️', // Torrential rain shower
    1249: '🌨️', // Light sleet showers
    1252: '🌨️', // Moderate or heavy sleet showers
    1255: '🌨️', // Light snow showers
    1258: '❄️', // Moderate or heavy snow showers
    1261: '🧊', // Light showers of ice pellets
    1264: '🧊', // Moderate or heavy showers of ice pellets
    1273: '⛈️', // Patchy light rain with thunder
    1276: '⛈️', // Moderate or heavy rain with thunder
    1279: '⛈️', // Patchy light snow with thunder
    1282: '⛈️' // Moderate or heavy snow with thunder
  },
  
  // Languages
  LANGUAGES: {
    en: { name: 'English', flag: '🇺🇸' },
    am: { name: 'አማርኛ', flag: '🇪🇹' }
  }
};
