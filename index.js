let input = document.querySelector("input");
let listParent = document.querySelector("ul");
let db = "./db/api.json";
/* 
database structure
[
    {
        "recipe": "Tomato Relish",
        "ingredients": ["tomato", "onion", "garlic", "salt", "pepper", "olive oil", "balsamic vinegar", "basil", "parmesan cheese"],
        "instructions": ["chop tomato", "chop onion", "chop and roast garlic", "mix all ingredients together"],
        "tags": ["sauce", "condiment", "charcuterie"],
        "image": "https://www.simplyrecipes.com/wp-content/uploads/2014/08/tomato-relish-horiz-a-1600.jpg"
    },
    {
        "recipe": "Chipotle Honey Dip",
        "ingredients": ["chipotle peppers in adobo sauce", "honey", "goat cheese", "salt", "pepper", "cream cheese"],
        "instructions": ["chop chipotle peppers", "mix all ingredients together"],
        "tags": ["sauce", "condiment", "charcuterie"],
        "image": "https://www.simplyrecipes.com/wp-content/uploads/2014/08/chipotle-honey-dip-horiz-a-1600.jpg"
    }


]
*/
let recipes = [];
let ingredients = [];
let tags = [];
function readDB() {
    fetch(db)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((element) => {
                recipes.push(element.recipe);
                element.ingredients.forEach((element) => {
                    ingredients.push(element);
                });
                element.tags.forEach((element) => {
                    tags.push(element);
                });
            });
        })

        .catch((error) => console.log(error));
}
readDB();
let foundRecipes = [];
let foundIngredients = [];
let foundTags = [];
console.log(recipes);
//search database for related words on each keyup, results should change the displayed list
input.addEventListener("keyup", (event) => {
    console.log(event.target.value);
    let search = event.target.value.toUpperCase();
    //search database for related words
    foundRecipes = recipes.filter((element) =>
        element.toUpperCase().includes(search)
    );
    foundIngredients = ingredients.filter((element) =>
        element.toUpperCase().includes(search)
    );
    foundTags = tags.filter((element) =>
        element.toUpperCase().includes(search)
    );
    console.log(foundRecipes);
    //display results
    displayResults();
});
function displayResults() {
    //remove all children from listParent
    while (listParent.firstChild) {
        listParent.removeChild(listParent.firstChild);
    }
    foundRecipes.forEach((element) => {
        console.log(element);
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "recipe";
        li.appendChild(span);
        listParent.appendChild(li);
    });
    foundIngredients.forEach((element) => {
        console.log(element);
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "ingredient";
        li.appendChild(span);
        listParent.appendChild(li);
    });
    foundTags.forEach((element) => {
        console.log(element);
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "tag";
        li.appendChild(span);
        listParent.appendChild(li);
    });
}
