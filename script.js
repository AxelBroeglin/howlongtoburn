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