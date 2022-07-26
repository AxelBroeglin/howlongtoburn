/***** PSEUDO CODE *****/
// - Type search
// - Choose food in list
// - Display result

// - Type activity search
// - Choose activity in list
// - Choose weight
// - Displays result (fetch in JSON -> activity.weight)

// - Check if food, activity and weight are != empty
// - Calc (calories/burntCal) * 60
// - Displays result



/***************FOOD VARIABLES*******************/
const searchFood = document.getElementById('search-food');
const matchListFood = document.getElementById('food');
let foodCalories = document.getElementById('food-calories');
/***************ACTIVITIES VARIABLES*************/
const search = document.getElementById('search');
const matchList = document.getElementById('activities');
let weight = document.getElementById('weight');
/***************RESULT VARIABLE*************/
let burntCal = weight.value;
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
        matchListFood.addEventListener('click', () =>{
            let kcal = food.value.slice(-4);
            foodCalories.innerHTML = `Number of calories in 100 grams of ${food.value.slice(0, -6)} :${kcal}`;
            kcalValue(kcal);
        })
    }
}

//Kcal from food, can be taken from a span containing the results
const kcalValue = function(kcal){
    //console.log(kcal)
}

/**********FOOD EVENT LISTENERS*********/
searchFood.addEventListener('input', (e) =>{
    searchForFood(searchFood.value); 
    }
);


/*******************************************/
/************ACTIVITIES CODE****************/
/*****************************************/

const searchActivities = async searchText => {
    const res = await fetch('./activities.json');
    const activities = await res.json();
    //Get matches to current text input
    let matches = activities.filter(sport => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        //console.log(sport.Activity.match(regex))
        return sport.Activity.match(regex);
    });
    console.log(matches)
    if (searchText.length === 0){
            matches = [];
        }
    // let kcalForKgs = matches;
    outputHtml(matches);
    outputHtml(matches);
    // burntCalCalc(kcalForKgs);
    // testtest(activities)
};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<option data-kgs60="${match.kgs60}" data-kgs70="${match.kgs70}" data-kgs80="${match.kgs80}" data-kgs90="${match.kgs90}">${match.Activity}</option>`
        )
        .join('');
        matchList.innerHTML = html;
    }
};

const weightData = matches => {
    console.log(matchList)
}

search.addEventListener('input', () => {
    searchActivities(search.value);
});




/*******************************************/
/*************RESULTS CODE*****************/
/*****************************************/

const calcResults = function(kcal,burntCal){
    let timeToBurn = (kcal*burntCal) * 60;
    console.log(timeToBurn)
    displayResults(kcal)
}

const displayResults = function (timeToBurn){
    if(matchListFood.value=='' || matchList.value==''){
        results.innerHTML= 'Please fill in the form'
        console.log('test2') //ok
    }else{
        console.log(timeToBurn)
        results.innerhtml = `It would take ${timeToBurn} minutes to burn 100 grams of `
    }
}


/*******RESULTS EVENT LISTENERS******/
//Eventlistener for button

console.log(burntCal)
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(burntCal);
    calcResults(food.value.slice(-4), burntCal)
})

matchList.addEventListener('click', () => console.log(matchList.dataset));
/**
 * ? has property ?
 */

//It takes ___ minutes of ____ to burn 100 grs of ______.  
/**
 * TODO Créer phrase résultat, avec classe underline span, remplacée par texte quand rempli.
 * TODO Récupérer le dataset de l'option choisie dans la liste d'activité en fonction du poids choisi. Choisir activités, choisir poids -> prends dataset correspondant.
 */