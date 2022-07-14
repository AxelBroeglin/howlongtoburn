// const main = document.getElementById('main');
// const form = document.getElementById('form');
// const search = document.getElementById('search');
// const dataList = document.getElementById('weight');


// function getActivities(filteredActivities){
//     fetch("./activities.json")
//     .then(response => {
//        return response.json();
//     })
//     .then(data => console.log(filteredActivities));
//     // .then(data => data.forEach(object =>{
//     //     if(object.activity === "filteredActivities"){
//     //         console.log(object[1]);
//     //     }else{
//     //         console.log('bah non')
//     //     }
//     // }));
// }

// function getMovies(url){
//     fetch(url).then(res => res.json()).then(data => {
//         showActivities(data.results);
//         }    
//     )
// }

// function showActivities(){
//     //append input Myactivity
//     //Dynamic generation
// }


// form.addEventListener("keyup", e => {
//     let searchString = [];
//     searchString.push(e.target.value.toLowerCase());
//     console.log(searchString)
//     const filteredActivities = searchString.filter(activity => {
//     return (
//         activity.includes(searchString)
//     );
//   });        

//   getActivities(filteredActivities);
//   showActivities(filteredActivities);
//   //Erase if nothing written
// });


const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

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

    console.table(matches);
    //outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<p>${match}</p>`)
        .join('');
        matchList.innerHTML = html;
        console.log(html);
    }
};

search.addEventListener('input', () => searchActivities(search.value));
