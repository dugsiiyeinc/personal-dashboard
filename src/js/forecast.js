// Function soo fetch garaynaya daatada
async function fetchForecastData(callback) {
    try {
      const response = await fetch('./src/data/forecast.json');
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

//   Macluumadka hawada kuwa ugu horeeya listigooda
fetchForecastData((data) => {
    cities = data.map((item) => item.location.split(',')[0]); // So furfuranaya magacyadooda magaalada ee ku jirta daatada
    updateCityButtons(); // Cusboonaysiinaya butonka magaalda ee widetka
    updateForecastDetails(cities[0]); // Tusi keliya mida ugu horaysa ee datada kujirta
  });



//   Function soo qabanaya iconka saxda ah ee hawada
  function getWeatherIcon(condition) {
    const conditionSlug = condition.replace(/\s+/g, '-').toLowerCase();
    return `./src/img/${conditionSlug}.png`;
  }
  
  let cities = [];
  let cityIndex = 0;

//   Function cusboonaysinaya macluumadka hawada
  function updateForecastDetails(city) {
    fetchForecastData((data) => {
      // Find the forecast data for the selected city
      const selectedCityData = data.find((item) => item.location.includes(city));
  
      // If data is found, update the forecast details container
      if (selectedCityData) {
        const forecastDetailsContainer = document.getElementById('forecast-details');
  
        // Generate the HTML content for the forecast details
        let forecastDetailsHTML = '';
        selectedCityData.forecast.forEach((dayData) => {
          const weatherIcon = getWeatherIcon(dayData.condition);
          forecastDetailsHTML += `
            <div class="day">
              <h3>${dayData.day}</h3>
              <div class="day-details">
                <img src="${weatherIcon}" alt="Weather Icon">
                <p class="high">Highest: ${dayData.high} °C</p>
                <p class="low">Lowest: ${dayData.low} °C</p>
                <p class="condition">Condition: ${dayData.condition}</p>
              </div>
            </div>
          `;
        });
  
        // shaqogeling ama cusbonaysiin html markupka lasameeyay
        forecastDetailsContainer.innerHTML = forecastDetailsHTML;
  
        // Ka saraayo magaalada ugu horeeyo ee activka ah
        const cityButtons = document.querySelectorAll('.city-btn');
        cityButtons.forEach((button) => {
          button.classList.remove('active');
        });
  
        // ku daraya classka activeka markii la riixo
        const clickedButton = document.querySelector(`.city-btn[data-city="${city}"]`);
        if (clickedButton) {
          clickedButton.classList.add('active');
        }
      }
    });
  }
  
// Function ka shaqaysiinaya next buttonka
function showNextCities() {
    cityIndex = Math.min(cityIndex + 1, cities.length - 3);
    updateCityButtons(); 
  
    // soo helaya magaalada ku xigta mida markaas lamarayo
    const nextCity = cities[cityIndex];
    
    // ugu yeer ama u wac funcionka updateForecastDetails oo hayimaado magalada ku xigta 
    updateForecastDetails(nextCity);
  }
  
  
// Function wax ka qabanaya kuwa lasoo dhaafay "previous"
function showPreviousCities() {
    cityIndex = Math.max(0, cityIndex - 1);
    updateCityButtons(); // cusboonaysii
  
    // soo helaya magaaladii lasoo dhaafay "previous"
    const prevCity = cities[cityIndex];
  
    // U wacaya updateForecastDetails functionka markii dib loo noqdo
    updateForecastDetails(prevCity);
  }
  
  
//   Function cusboonaysii buttonka magaaloyinka
  function updateCityButtons() {
    const widgetContainer = document.querySelector('.widget-container');
    widgetContainer.innerHTML = '';
  
    // Tusaya keliya 3 magaalo markiiba
    const visibleCities = cities.slice(cityIndex, cityIndex + 3);
  
    // Soo muuji haddii ay jirto keliiya magaalo laso dhaafay ama ka dambaysa
    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-city');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', showPreviousCities);
    if (cityIndex > 0) {
      widgetContainer.appendChild(prevButton);
    }
  
    // Ku daraya button magaalda markaas la dul joogo
    visibleCities.forEach((city) => {
      const button = document.createElement('button');
      button.classList.add('city-btn');
      button.dataset.city = city;
      button.textContent = city;
      widgetContainer.appendChild(button);
      // Add click event listeners to the city buttons
      button.addEventListener('click', () => {
        updateForecastDetails(city);
      });
    });
  
    // Ku daraya "Next" button haddii aya jiraan magaaloyin harsan oo la tusayo
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-city');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', showNextCities);
    if (cities.length > cityIndex + 3) {
      widgetContainer.appendChild(nextButton);
    }
  }
  

  