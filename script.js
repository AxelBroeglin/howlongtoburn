// const main = document.getElementById('main');
// const dataList = document.getElementById('weight');


const search = document.getElementById('search');
const matchList = document.getElementById('activities');

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

    // console.table(matches);
    outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<option value="${match.Activity}">${match.Activity}</p>`
        )
        .join('');
        matchList.innerHTML = html;
        console.log(html);
    }
};

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


//FOOD API
fetch(
    `https://trackapi.nutritionix.com/v2/search/instant?query=${item}`,
    {headers: {
        "x-app-id": "8a5cc80d",
        "x-app-key": "5edc678264dcbc2dd1153790ef4505f7",
    },
    }
)

const searchFood = async searchTextFood => {
    const res = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${item}`,
        {headers: {
            "x-app-id": "8a5cc80d",
            "x-app-key": "5edc678264dcbc2dd1153790ef4505f7",
        },
        });
    const nutriments = await res.json();
    //Get matches to current text input
    let matchesFood = nutriments.filter(nutriment => {
        const regex = new RegExp(`^${searchTextFood}`, 'gi');
        return nutriment.Activity.match(regex);
    });

    if (searchTextFood.length === 0){
        matchesFood = [];
    }

    // console.table(matches);
    outputHtmlFood(matchesFood);
};

