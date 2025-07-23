# OpenSemay: Deployable Ethiopian Weather Forecasting Web App (current 0.1 beta)

## Description  
OpenSemay is a lightweight, open-source weather forecasting web app tailored specifically for Ethiopia. It’s designed to be easily deployable on modest hardware by users with minimal tech skills, making weather data accessible even in rural areas with limited resources. The app fetches hyper-local weather info using WeatherAPI and presents it in a simple, clean interface.

The main goal is to empower local communities, farmers, and anyone needing quick weather updates without relying on heavy commercial apps or constant internet access. It’s not a commercial product but a public service built for impact.

---

## Features  
- Simple and minimalistic web app UI built with plain HTML, CSS, and JavaScript.  
- Uses WeatherAPI to fetch accurate weather data.  
- Covers Ethiopian geographic boundaries with focus on hyper-local forecasts.  
- Open source: anyone can download, customize, or contribute.  
- Deployable as a VM image for easy setup on local machines.  
- Configurable API key for personalized weather data access.  
- Designed for low-resource environments: low storage, minimal dependencies.  
- Responsive map centered on Ethiopia with zoom controls.  
- Supports English and Amharic languages.  

---

## Server System Requirements  
- Virtual machine software (VirtualBox, VMware, or similar)  
- Host computer with at least:  
  - 2 GHz x86_64 CPU  
  - 1 GB RAM 
  - 1 GB free disk space  
  - Network access for weather API calls  

---

## Installation  

### 1. Download and Import VM  
- Download the OpenSemay OVA file from the GitHub Releases page.  
- Import the OVA into your virtualization software following its import instructions.  
- Make sure you set the Network to Bridged Mode to access the app on Host or other machines/devices on the same network

### 2. Start the VM  
- Boot the imported VM.  
- Log in with the credentials username:root password:op.
- Get your Access ip by typing 

```bash 
    ifconfig | grep 'inet ' | grep -v '192.168'
```
- This command should return with an IP Address like "192.168.0.1", if not please make sure you set you VM Network on Briged Mode and restart  

### 3. Access the Weather App  
- Once you have your IP  Address open a browser on the Host machine or any other device on the same network and navigate to http://YOUR-IP.

---

## How to Change the Weather API Key  

By default, OpenSemay doesnt have an API key. Once you make sure that the webapp is live and accessible you need to create an account at https://www.weatherapi.com and follow the next steps

### Steps:  
1. **In the VM**
Run:  
   ```bash  
   nano /var/www/OpenSemay/js/config.js 
   ```
2. **Locate the line**

```bash 
        WEATHER_API_KEY: 'YOUR API KEY'
```
At the first line of the code, 
3. And replace the the text with your API key.
4. Save and Exit nano by pressing Ctrl+O, Enter, Ctrl+X
5. Restart the web server 

```bash 
     rc-service nginx restart  
```



## Usage Notes
- The app is optimized for Ethiopian users, displaying data relevant to Ethiopia’s boundaries.
- Internet connection is required for the initial API calls. Cached data may be available     
   for offline use depending on browser settings.
- The VM setup is intended for ease of deployment; users with basic command-line 
  familiarity  can manage API key changes and server restarts.
- Contributions and feature requests are welcome via GitHub issues and pull requests.

## Future Updates and Planned Features
- A simple webConfig page to replace API instead of the current Direct Nano Edit - > 0.2
- A setup release for Windows systems with its own server and a more Plug and Play usage -> 0.3
- Use a local Weather Forcast Source instead of the global WeatherAPI for a more accurate and reliable results -> ~0.4 - 1.0


## Troubleshooting

- VM won’t start or is slow: Make sure your host machine meets the minimum requirements.

-   No weather data shown: Check your API key or internet connection.

-   Unable to edit config.js: Ensure you have the right permissions inside the VM and follow the nano commands carefully.

-   Server errors: Restart nginx with the command above.

## License

OpenSemay is released under the MIT License. Feel free to use, modify, and share.

## Contact

For questions, feature requests, or support, open an issue on GitHub or contact the maintainer via the repo.









