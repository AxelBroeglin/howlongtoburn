/***************FOOD VARIABLES*******************/
const searchFood = document.getElementById('search-food');
const matchListFood = document.getElementById('food');
/***************ACTIVITIES VARIABLES*************/
const search = document.getElementById('search');
const matchList = document.getElementById('activities');
let weight = document.getElementById('weight');
/***************RESULT VARIABLE*************/
let burntCal = weight.value;
const results = document.getElementById('results');
const spanFood = document.getElementById('span-food');
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
        html.push(`<option class='options-food fields'>${nutriments[i].food_name} - ${nutriments[i].nf_calories}</option>`)
        matchListFood.innerHTML = html;        
        matchListFood.addEventListener('change', () =>{
            let kcal = food.value.slice(-3);
            spanFood.innerHTML = `${food.value.slice(0, -6)} (${kcal} kcal)`;
            spanFood.classList.remove('span-results-default');
            spanFood.classList.add('span-results-filled');
        })
    }
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
        return sport.Activity.match(regex);
    });
    if (searchText.length === 0){
            matches = [];
        }
    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<option class="fields" data-kgs60="${match.kgs60}" data-kgs70="${match.kgs70}" data-kgs80="${match.kgs80}" data-kgs90="${match.kgs90}">${match.Activity}</option>`
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
matchList.addEventListener('change', () => {
    spanActivity.innerHTML = matchList.options[matchList.selectedIndex].innerHTML;
    spanActivity.classList.remove('span-results-default');
    spanActivity.classList.add('span-results-filled');
});

 weight.addEventListener('change', () => {
        let selectedKgs = weight.options[weight.selectedIndex].value;
        calForKgs(selectedKgs);
 })

const calForKgs = function (selectedKgs) {
    let kcal = food.value.slice(-4);
    selectedKgs = matchList.options[matchList.selectedIndex].dataset[`${selectedKgs}`];
    let timeToBurn = (kcal/selectedKgs) * 60;
    if(typeof timeToBurn == 'number'){
        spanMinutes.innerHTML = Math.trunc(timeToBurn);
        spanMinutes.classList.remove('span-results-default');
        spanMinutes.classList.add('span-results-filled');
    } else {
        spanMinutes.classList.add('span-results-default');    
        spanMinutes.classList.remove('span-results-filled');
    }
}


/**
 * *S'il n'y a qu'un choix dans la liste event listener ne fonctionne pas car il est sur change, pas possible de changer si qu'un seul choix
 * * Propositions devraient être affichées dans une liste ouverte, pour inciter au choix
 * * Afficher liste de choix sous la boite de rechercher, pas dans select-option, comme dans auto complete etats. (Liste passe au dessus du reste, ne le pousse pas)
 * * Préparer
 */
