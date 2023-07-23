const displayLocation = document.querySelector('#display-location');
const weatherCondition = document.querySelector('#weather-condition');
const conditionBox = document.querySelector('#conditionbox')
let listLocation;

const allCity = async function(){

    try {
        const response = await fetch('../src/data/conditions.json');
        const data = await response.json()
       
        listLocation = data;
        data.map(fil =>{
          let option = document.createElement('option')
          
           option.value = fil.location;
           option.text = fil.location;
         weatherCondition.appendChild(option)
            
        });


        
    } catch (error) {
        console.log(error)
    }
  
}


allCity();


weatherCondition.addEventListener('change', ()=>{
  
    const filterLocation = listLocation.filter(fil => fil.location === weatherCondition.value)[0];
    console.log(filterLocation);
   
    conditionBox.innerHTML = '';
    const html = `
    
   

        <h1>${filterLocation.location}</h1>
        <div>
        <span>${filterLocation.temperature } </span>
        <span>${filterLocation.condition} </span>
        </div>
    
    
    `;


    conditionBox.insertAdjacentHTML('afterbegin', html)

});
