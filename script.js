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

/*******************************************/
/************ACTIVITIES CODE****************/
/*****************************************/

//Search JSON and filter it
const searchActivities = async searchText => {
    const res = await fetch('./activities.json');
    const activities = await res.json();
    console.log(activities)
    //Get matches to current text input
    let matches = activities.filter(sport => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        console.log(sport.match(regex))

        // This returns that not a function. The match is an object, not a function. Need to work on it.
        return sport.match(regex);
    });
    if (searchText.length === 0){
            matches = [];
        }
    let kcalForKgs = matches;
    outputHtml(matches);
    burntCalCalc(kcalForKgs);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        weight = weight.value
        console.log(weight)
        const html = matches.map(match => `<option value="${match.kgs60}">${match.Activity}</option>`
        )
        .join('');
        matchList.innerHTML = html;
    }
};

const testCal = function(kcalForKgs, activityChoice){
    console.log(kcalForKgs)
}

weight.addEventListener('click', () =>{
        console.log(matchList.value)
        let activityChoice = matchList.value;
        //foodCalories.innerHTML = `100 grams of ${food.value.slice(0, -4)} equals ${kcal} kcal`;
        //kcalValue(kcal);
        console.log(activityChoice)
        //Send this 
        return activityChoice;
    })




const burntCalCalc = function(activitiesValue) {
    console.log(activitiesValue)
}

//const burntCalCalc = kcalForKgs => {
    //Need to use if x is set => do this, otherwise returns several undefined or not a function (because burntCalCalc does not have the input yet)

    //function gets the filtered results of search for activity
    //console.log(kcalForKgs)

    //function gets the value of the weight
    //console.log(weight.value)
    //need to filter kcalForKgs, look for the weight.value == selected activity
    // let actiVal = activities.value; 
    // kcalForKgs.filter(cal => {
    //     console.log(kcalForKgs.match(actiVal.kgs60));
    // })
    // console.log(kcalForKgs);
//}

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


// const calcResults = function (kcal, burntCal){
//     let timeToBurn = (kcal/burntCal) * 60;
//     return timeToBurn;
// }

// const displayResults(timeToBurn){
//     const resultOfCalc = calcResults()
// }

// displayResults(*kcal, *burntCal)


/*******************************************/
/*************EVENT LISTENERS**************/
/*****************************************/

/**********FOOD EVENT LISTENERS*********/
searchFood.addEventListener('input', (e) =>{
    searchForFood(searchFood.value); 
    }
)

/******ACTIVITIES EVENT LISTENERS******/
//See how to make option disappear when clicked
search.addEventListener('input', () => searchActivities(search.value));
matchList.addEventListener('input', () => burntCalCalc(activities.value));
weight.addEventListener('input', () => {
    let activitiesValue = weight.value
    console.log(activitiesValue)
});

/*******RESULTS EVENT LISTENERS******/
//Eventlistener for button

console.log(burntCal)
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    console.log(burntCal);
    calcResults(food.value.slice(-4), burntCal)
})

