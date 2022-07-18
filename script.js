/***************FOOD VARIABLES*******************/
const searchFood = document.getElementById('search-food');
const matchListFood = document.getElementById('food');
let foodCalories = document.getElementById('food-calories');
/***************ACTIVITIES VARIABLES*************/
const search = document.getElementById('search');
const matchList = document.getElementById('activities');
/***************RESULT VARIABLE*************/
const results = document.getElementById('results');


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
    let nutriments = await res.json();
    nutriments=Array.from(nutriments.branded);    
    outputHtmlFood(nutriments);
};



//Show results in HTML
const outputHtmlFood = nutriments => {
    let html = [];
    for (let i = 0; i < 10; i++) {
        html.push(`<option class='options-food'>${nutriments[i].food_name} - ${nutriments[i].nf_calories}</option>`)
        matchListFood.innerHTML = html;
        console.log(html)
        matchListFood.innerHTML = html;
        
        matchListFood.addEventListener('click', () =>{
            let kcal = food.value.slice(-3);
            foodCalories.innerHTML = `100 grams of ${food.value.slice(0, -4)} equals ${kcal} kcal`;
        })
    }}


/***************FOOD EVENT LISTENERS*************/
searchFood.addEventListener('input', (e) =>{
    searchForFood(searchFood.value); 
    }
)




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
    }
};


/***************ACTIVITIES EVENT LISTENERS*************/
//See how to make option disappear when clicked
search.addEventListener('input', () => searchActivities(search.value));


/*******************************************/
/*************RESULTS CODE*****************/
/*****************************************/

function calcResults(){
    if(matchListFood.value=='' || matchList.value==''){
        results.innerHTML= 'Please fill in the form'
        console.log('test2') //ok
    }else{
        foodCalories.innerHTML= '100 grams = '+matchListFood.value;
        console.log('test3')
    }
}


/***************RESULTS EVENT LISTENERS*************/
//Eventlistener for button
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    calcResults();
})

//Issue with "fill in the form"
//The number of calories should be shown when food is selected, not on sumbit
//foodCalories.innerHTML= '100 grams = '+matchListFood.value; must be moved to the right place in order to get the right value