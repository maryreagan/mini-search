let input = document.querySelector("input");
let listParent = document.querySelector("ul");
let listItems = document.querySelectorAll("li");
let db = "./db/api.json";
let recipeView = document.querySelector(".recipe-view");
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
let allRecipes = [];
let recipes = [];
let ingredients = [];
let tags = [];
 async function readDB() {
    await fetch(db)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            allRecipes = data;
            console.log(allRecipes)
            data.forEach((element) => {
                if (!recipes.includes(element.recipe)) {
                    recipes.push(element.recipe);
                }
                element.ingredients.forEach((element) => {
                    if (!ingredients.includes(element)) {
                        ingredients.push(element);
                    }
                });
                element.tags.forEach((element) => {
                    if (!tags.includes(element)) {
                        tags.push(element);
                    }
                });
            });
        })

        .catch((error) => console.log(error))
}
readDB();
let foundRecipes = [];
let foundIngredients = [];
let foundTags = [];
console.log(recipes);
//search database for related words on each keyup, results should change the displayed list
input.addEventListener("keyup", (event) => {
    if(document.querySelector(".recipe-container")){
        document.querySelector(".recipe-container").remove();
    }
    console.log(event.target.value);
    let search = event.target.value.toUpperCase();
    console.log(search);
    //search database for related words
    if (search !== "") {
        foundRecipes = recipes.filter((element) =>
            element.toUpperCase().includes(search)
        );
        foundIngredients = ingredients.filter((element) =>
            element.toUpperCase().includes(search)
        );
        foundTags = tags.filter((element) =>
            element.toUpperCase().includes(search)
        );
        //display results
        displayResults();
    } else {
        while (listParent.firstChild) {
            listParent.removeChild(listParent.firstChild);
        }
    }
});
function displayResults() {
    //remove all children from listParent
    while (listParent.firstChild) {
        listParent.removeChild(listParent.firstChild);
    }
    //Add new children to listParent by type
    foundRecipes.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "recipe";
        li.appendChild(span);
        listParent.appendChild(li);
    });
    foundIngredients.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "ingredient";
        li.appendChild(span);
        listParent.appendChild(li);
    });
    foundTags.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = element;
        let span = document.createElement("span");
        span.textContent = "tag";
        li.appendChild(span);
        listParent.appendChild(li);
    });
    listItems = document.querySelectorAll("li");

    listItems.forEach((element) => {
        element.addEventListener("click", (event) => {
            while (listParent.firstChild) {
                listParent.removeChild(listParent.firstChild);
            }
            let recipeContainer = document.createElement("div");
            recipeContainer.classList.add("recipe-container");
            let type = event.target.lastChild.innerHTML;
            //remove span element
            element.lastChild.remove();
            //Find all occurances of the clicked element in the allRecipes array based on type
            let recipes = [];
            if (type === "recipe") {
                recipes = allRecipes.filter(
                    (element) => element.recipe === event.target.innerHTML
                );
            } else if (type === "ingredient") {
                recipes = allRecipes.filter((element) =>
                    element.ingredients.includes(event.target.innerHTML)
                );
            } else if (type === "tag") {
                recipes = allRecipes.filter((element) =>
                    element.tags.includes(event.target.innerHTML)
                );
            }
            recipes.forEach((recipe) => {
                //create element and display recipe name
                let recipeName = document.createElement("h2");
                recipeName.classList.add("recipe-name");
                recipeName.textContent = recipe.recipe;
                recipeContainer.appendChild(recipeName);
                //create element and display recipe image
                let recipeImage = document.createElement("img");
                recipeImage.classList.add("recipe-image");
                recipeImage.src = recipe.image;
                recipeContainer.appendChild(recipeImage);
                //create element and diplay each recipe ingredient
                let recipeIngredients = document.createElement("div");
                recipeIngredients.classList.add("recipe-ingredients");
                recipe.ingredients.forEach((element) => {
                    let ingredient = document.createElement("p");
                    ingredient.classList.add("ingredient");
                    ingredient.textContent = element;
                    recipeIngredients.appendChild(ingredient);
                });
                recipeContainer.appendChild(recipeIngredients);
                //create element and display each recipe instruction
                let recipeInstructions = document.createElement("div");
                recipeInstructions.classList.add("recipe-instructions");
                recipe.instructions.forEach((element, index) => {
                    let instruction = document.createElement("p");
                    instruction.classList.add("instruction");
                    instruction.textContent = `Step ${index + 1}: ${element}`
                    recipeInstructions.appendChild(instruction);
                });
                recipeContainer.appendChild(recipeInstructions);
                //create element and display each recipe tag
                let recipeTags = document.createElement("div");
                recipeTags.classList.add("recipe-tags");
                recipe.tags.forEach((element) => {
                    let tag = document.createElement("p");
                    tag.classList.add("tag");
                    tag.textContent = "#" + element;
                    recipeTags.appendChild(tag);
                });
                recipeContainer.appendChild(recipeTags);
                recipeView.appendChild(recipeContainer);
            })
        })
    })
}