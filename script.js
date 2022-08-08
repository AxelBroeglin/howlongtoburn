/***************FOOD VARIABLES*******************/
const searchFood = document.getElementById('search-food');
const matchListFood = document.getElementById('match-list-food');
/***************ACTIVITIES VARIABLES*************/
const search = document.getElementById('search');
const matchList = document.getElementById('match-list-activity');
let weight = document.getElementById('weight');
let weight2 = document.getElementById('weight2');
/***************RESULT VARIABLE*************/
const results = document.getElementById('results');
const spanFood = document.getElementById('span-food');
let spanCal = document.getElementById('span-cal');
const spanActivity = document.getElementById('span-activity');
const spanMinutes = document.getElementById('span-minutes');


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
        html.push(`<div class='search-results'>${nutriments[i].food_name} - ${Math.trunc(nutriments[i].nf_calories)}</div>`)
        matchListFood.innerHTML = html.join('');  
    }
}

let weightOptions = ["<option></option>"];
for (let i = 50; i < 121; i++) {
    weightOptions.push(`<option value='${[i]}'> ${[i]} kgs</option>`);
    console.log(weightOptions)
    weight2.innerHTML = weightOptions.join('');  
    }

/**********FOOD EVENT LISTENERS*********/
searchFood.addEventListener('input', (e) =>{
    searchForFood(searchFood.value); 
    }
);

matchListFood.addEventListener('click', () =>{
    let kcal = event.target.innerHTML.slice(-3);
    if(spanFood.classList.contains('span-results-filled')){
        spanFood.innerHTML = `${event.target.innerHTML.slice(0, -6)} (${kcal}`;
        calForKgs();
    }
    else{
        if(kcal.length > 0){
            spanFood.innerHTML = `${event.target.innerHTML.slice(0, -6)} (${kcal}`;
            spanCal.classList.add('visible');
            spanCal.classList.remove('invisible');
            spanFood.classList.remove('span-results-default');
            spanFood.classList.add('span-results-filled');
        }    
    }
})

/*******************************************/
/************ACTIVITIES CODE****************/
/*****************************************/

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
    outputHtml(matches.slice(0,10));
};

//For loop to limit at 10 results ?
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<div class="search-results" data-kgs60="${match.kgs60}" data-kgs70="${match.kgs70}" data-kgs80="${match.kgs80}" data-kgs90="${match.kgs90}">${match.Activity}</div>`
        )
        .join('');
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => {
    searchActivities(search.value);
});


/*******************************************/
/*************RESULTS CODE*****************/
/*****************************************/

/*******RESULTS EVENT LISTENERS******/

//if else to check if a calc has already been done, if yes jump to calc, if no, regular calc
matchList.addEventListener('click', () => {
    if(event.target.innerHTML !== ""){
        spanActivity.innerHTML = event.target.innerHTML;
        for (const kgs in spanActivity.dataset) {
            spanActivity.dataset[kgs] = event.target.dataset[kgs];
            spanActivity.classList.remove('span-results-default');
            spanActivity.classList.add('span-results-filled');
        }
        if(spanFood.classList.contains('span-results-filled')){
            calForKgs();
        }
    }
});

//Change weight calls calForKgs that calls calcul
 weight.addEventListener('change', () => {
    calForKgs();
 })


const calForKgs = function () {
    let selectedKgs = weight.options[weight.selectedIndex].value;
    selectedKgs = spanActivity.dataset[`${selectedKgs}`];
    calculResults(selectedKgs);
}

const calculResults = function (selectedKgs) {
    let kcal = spanFood.innerHTML.slice(-3);
    let timeToBurn = (kcal/selectedKgs) * 60;
    if(!isNaN(timeToBurn)){
        spanMinutes.innerHTML = Math.trunc(timeToBurn);
        spanMinutes.classList.remove('span-results-default');
        spanMinutes.classList.add('span-results-filled');
    } else{
        spanMinutes.classList.add('span-results-default');
        spanMinutes.classList.remove('span-results-filled');
    }
}


/**
 * *S'il n'y a qu'un choix dans la liste event listener ne fonctionne pas car il est sur change, pas possible de changer si qu'un seul choix
 * * Propositions devraient être affichées dans une liste ouverte, pour inciter au choix
 * * Afficher liste de choix sous la boite de rechercher, pas dans select-option, comme dans auto complete etats. (Liste passe au dessus du reste, ne le pousse pas)
 * * La liste disparaitra au clic, obligeant à recliquer dans champ de rechercher pour modifier, nouveau clic -> ouvre liste -> clic dans liste triggers l'event listener relançant le calcul et maj de la phrase
 * * Préparer les classes et variables pour le changement, prévoir le css.
 * TODO Pour le changement une fois un premier calcul fait :
 * TODO détecter la classe des span pour savoir si elles contiennent quelque chose, si oui refaire calcul
 * TODO Cette dectection doit se faire au clic, comme la précédente.
 * 
 *  */
