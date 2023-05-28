// Query Selectors

var inputs = document.querySelectorAll('input');
var cookpot = document.querySelector('.cookpot');
var recipeView = document.querySelector('.recipe-view');
var recipe = document.querySelector('.recipe');

var letsCookButton = document.querySelector(".lets-cook-btn");
var favoriteButton = document.querySelector('.favorite');
var clearButton = document.querySelector('.clear');
var myFavoritesButton = document.querySelector('.show-favorites');
var goBackButton = document.querySelector('.back');
var removeButton = document.querySelector('.remove');

var favoritesPage = document.querySelector('.favorites-page');
var mainPage = document.querySelector('.main');

var headerTitle = document.querySelector('.header-title');
var headerFavorites = document.querySelector('.header-favs')
var favoritesList = document.querySelector('.favs-list');


// Variables

var sides = [
    "Rice Pilaf"
]
var mains = [
    "Steak"
]
var desserts = [
"Apple Pie",
"Lemon Meringue Pie",
"Black Forest Cake",
"Banana Bread",
"Peach Cobbler",
"Cheesecake",
"Funfetti Cake",
"Baklava",
"Flan",
"Macarons",
"Macaroons",
"Chocolate Cupcakes",
"Pavlova",
"Pumpkin Pie",
"Key Lime Pie",
"Tart Tatin",
"Croissants",
"Eclairs",
]
var currentRecipe = {
    type: '',
    dish: '',
};
var favoriteRecipes = [];


// Event Listeners

letsCookButton.addEventListener('click', function(){
    getInput();
    getRandomRecipe(getRandomIndex());
    displayRecipe();
})

clearButton.addEventListener('click', clearRecipe);

favoriteButton.addEventListener('click', function(){
    favoriteRecipe();
});

myFavoritesButton.addEventListener('click', function(){
    toggleView()
    displayFavorites();
});

goBackButton.addEventListener('click', function(){
    clearRecipe();
    clearInput();
    toggleView();
    goBack();
});

favoritesList.addEventListener('click', function(event) {
     removeFavorite(event);
})


// Functions and Event Handlers

function createFavoriteRecipe(type, dish) {
    return {
        type: type,
        dish: dish,
        id: Date.now(),
        }
}

function getRandomIndex() {
    return Math.floor(Math.random() * window[currentRecipe.type].length);
}

function getInput() {
    for (var i = 0; i < inputs.length; i++) {
        if(inputs[i].checked) {
            currentRecipe.type = inputs[i].value;
        }
    }
}

function getRandomRecipe(index) {
    currentRecipe.dish = window[currentRecipe.type][index];
    recipe.innerText = currentRecipe.dish;
}

function displayRecipe() {
    cookpot.classList.add('hidden');
    recipeView.classList.remove('hidden');
}


function clearRecipe() {
    currentRecipe.dish = ''
    clearInput();
    cookpot.classList.remove('hidden');
    recipeView.classList.add('hidden');
}

function favoriteRecipe() {
    var recipe = createFavoriteRecipe(currentRecipe.type, currentRecipe.dish);

    for (var i = 0; i < favoriteRecipes.length; i++){
        if (recipe.dish === favoriteRecipes[i].dish){
            return;
        }
    }
    favoriteRecipes.push(recipe);
}

function toggleView() {
    headerFavorites.classList.toggle('hidden');
    favoritesPage.classList.toggle('hidden');
    goBackButton.classList.toggle('hidden');
    removeButton.classList.toggle('hidden');
    mainPage.classList.toggle('hidden');
    myFavoritesButton.classList.toggle('hidden');
    headerTitle.classList.toggle('hidden');

}

function displayFavorites() {
    favoritesList.innerHTML = '';

    for (var i = 0; i < favoriteRecipes.length; i++){
        favoritesList.innerHTML += `<article class="card" id="${favoriteRecipes[i].dish}"><h3>${favoriteRecipes[i].dish}</h3></article>`;
    }
}

function clearInput() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
}

function removeFavorite(event) {
    for (var i = 0; i < favoriteRecipes.length; i++){
        if (event.target.id === favoriteRecipes[i].dish){
            favoriteRecipes.splice(i, 1);
        }
    }
    
    displayFavorites();
}