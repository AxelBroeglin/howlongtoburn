/***************FOOD VARIABLES*******************/
const searchFood = document.getElementById('search-food');
let matchListFood = document.getElementById('food');

/***************ACTIVITIES VARIABLES*************/
const search = document.getElementById('search');
const matchList = document.getElementById('activities');

/***************RESULT VARIABLE*************/
const result = document.getElementById('results');



/*******************************************/
/***************FOOD CODE*******************/
/*****************************************/

//Get data from api from search
const searchForFood = async searchTextFood => {
    const res = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchFood.value}`,
        {headers: {
            "x-app-id": "8a5cc80d",
            "x-app-key": "5edc678264dcbc2dd1153790ef4505f7",
        },
        });
    const nutriments = await res.json();
    console.log(nutriments.branded);
    console.log(nutriments.branded[1].food_name)

    //Get matches to current text input - MADE ARRAY BECAUSE OF NUTRIMENTS NOT BEING A FUNCTION ERROR
    let matchesFood = Array.from(nutriments).filter(nutriment => {
        const regex = new RegExp(`^${searchTextFood}`, 'gi');
        console.log(searchTextFood)
        return nutriment.branded.match(regex);
    });
    
    if (searchTextFood.length === 0){
        matchesFood = [];
    }

    outputHtmlFood(matchesFood);
};

//Show results in HTML
const outputHtmlFood = matchesFood => {
    if(matchesFood.length > 0){
        matchListFood = [];
        console.log(matchesFood)
        const html = matchesFood.map(matchFood => `<option value="${matchFood}">${matchFood}</p>`
        )
        .join('');
        console.log(matchListFood);
        matchListFood.innerHTML = html;   
        console.log(matchListFood);
    }
};

/***************FOOD EVENT LISTENERS*************/
searchFood.addEventListener('input', () => searchForFood(searchFood.value));




/*******************************************/
/************ACTIVITIES CODE****************/
/*****************************************/

//Search JSON and filter it
const searchActivities = async searchText => {
    const res = await fetch('./activities.json');
    const activities = await res.json();
    //Get matches to current text input
    let matches = activities.filter(sport => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return sport.Activity.match(regex);
    });

    if (searchText.length === 0){
        matches = [];
    }
    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<option value="${match.Activity}">${match.Activity}</option>`
        )
        .join('');
        matchList.innerHTML = html;
        console.log(html);
    }
};


/***************ACTIVITIES EVENT LISTENERS*************/
//See how to make option disappear when clicked
search.addEventListener('input', () => searchActivities(search.value));

//Eventlistener for button
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log('test') //ok


//     const searchTerm = search.value;

//     if(searchTerm) {
//         getMovies(searchURL+'&query='+searchTerm);
//     }
})


/*******************************************/
/*************RESULTS CODE*****************/
/*****************************************/

