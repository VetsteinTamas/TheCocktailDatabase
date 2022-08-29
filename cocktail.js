const cocktailDataEl = document.querySelector(".row");
const id = localStorage.getItem("id");

async function renderCocktail(id) {
  const cocktail = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const cocktailData = await cocktail.json();
  console.log(cocktailDataEl);
  cocktailDataEl.innerHTML = cocktailData["drinks"].map((cocktail) =>
    postCocktailData(cocktail)
  );

  console.log(cocktailData["drinks"]);
}

function postCocktailData(cocktail) {
  //ingredient for loop
  let ingredients = "";
  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strIngredient` + `${i}`] !== null) {
      ingredients += `<li class="quad__list--item"><b>${
        cocktail[`strIngredient` + `${i}`]
      }</b></li>`;
    } else {
      break;
    }
  }

  //measure for loop
  let measures = "";
  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strMeasure` + `${i}`] !== null) {
      measures += `<li class="quad__list--item"><b>${
        cocktail[`strMeasure` + `${i}`]
      }</b></li>`;
    } else {
      break;
    }
  }
  return `
  <div class="cocktail__textarea">
  <div class="wrapper">
  <div class="upperArea">
  <div class="isAlcoholic">${cocktail.strAlcoholic}
  <h1 class="cocktail__textarea--title" style="color:#242424">
    ${cocktail.strDrink}
    </h1>
    </div>
    <a href="cocktails.html" style="color: #242424; ">
    <i class="fa-solid fa-backward"></i>
    </a>
    </div>

    <div class="quad__div">
    <div class="quad quad__left">
      <h3><span class="white">Category:</span><br> ${cocktail.strCategory}</h3>
    </div>
    <div class="quad quad__right">
    <h3><span class="white">Glass type:</span><br> ${cocktail.strGlass}</h3>
    </div>
    </div>
    <div class="ingredient__div">
      <h3>
        <span class="white">Ingredients and Measures:</span>
        </h3>
        <div class="ing__and__mes">
        <ul class="quad__list">
        ${ingredients}
        </ul>
        <ul class="quad__list">
        ${measures}
        </ul>
        </div>
        </div>
        <div class="instruction__div">
        <p class="instruction">
        <b>
        ${cocktail.strInstructions}
        </b>
        </p>
        </div>
        </div>
        </div>
        
        <img
        class="cocktail__textarea--img"
            src="${cocktail.strDrinkThumb}"
            alt=""
          />`;
}

renderCocktail(id);
