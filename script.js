const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const dataList = document.getElementById('weight');


function getActivities(filteredActivities){
    fetch("./activities.json")
    .then(response => {
       return response.json();
    })
    .then(data => showActivities(data.results));
}

function showActivities(filteredActivities){
    //append input Myactivity
    //Dynamic generation
}


form.addEventListener("keyup", e => {
    let searchString = [];
    searchString.push(e.target.value.toLowerCase());

        console.log(searchString);
    
    const filteredActivities = searchString.filter(activity => {

    return (
        activity.includes(searchString)
    );
    
  });
  console.log(filteredActivities)
  getActivities(filteredActivities);

  showActivities(filteredActivities);

  //Erase if nothing written

});