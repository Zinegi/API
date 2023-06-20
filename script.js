const API_KEY = "f375c107f97c4de097880a069cfc0cb4";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes){
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        let recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");

        let recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;

        let recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        let recipeIngredientsEl = document.createElement("p");
        let ingredientsText = recipe.extendedIngredients.map((ingredient) => ingredient.original).join("<br> - ");
        let truncatedIngredientsText = ingredientsText.substring(0, 200); 

        recipeIngredientsEl.innerHTML = `
        <strong>Ingredients: </strong> <br> <br> - ${truncatedIngredientsText}
        ...`;

        let showMoreBtn = document.createElement("button");
        showMoreBtn.innerText = `Afficher plus`;

        showMoreBtn.addEventListener("click", function() {
            if (showMoreBtn.innerText === "Afficher plus") {
                recipeIngredientsEl.innerHTML = `
                <strong>Ingredients: </strong> <br> <br> - ${ingredientsText}
                `;
                showMoreBtn.innerText = "Afficher moins";
            } else {
                recipeIngredientsEl.innerHTML = `
                <strong>Ingredients: </strong> <br> <br> - ${truncatedIngredientsText}
                ...`;
                showMoreBtn.innerText = "Afficher plus";
            }
        });

        let recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.target = "blank";
        recipeLinkEl.innerText = "Voir la recette";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(showMoreBtn);
        recipeItemEl.appendChild(recipeLinkEl);
        recipeListEl.appendChild(recipeItemEl);
    });
}

async function getRecipes(){
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes;
}

async function init(){
    const recipes = await getRecipes();
    console.log(recipes);
    displayRecipes(recipes);
}

init();
