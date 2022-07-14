const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const dataList = document.getElementById('weight');


function getActivities(filteredActivities){
    fetch("./activities.json")
    .then(response => {
       return response.json();
    })
    .then(data => console.log(data));
}

function showActivities(){
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
  getActivities(filteredActivities);

  showActivities(filteredActivities);

  //Erase if nothing written

});