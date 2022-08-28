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
  return `
  <div class="cocktail__textarea">
  <div class="upperArea">
    <div class="isAlcoholic">${cocktail.strAlcoholic}</div>
    <h1 class="cocktail__textarea--title">
      ${cocktail.strDrink}
    </h1>
  </div>

  <div class="quad__div">
    <div class="quad">
      <h3><span class="white">Category:</span><br> ${cocktail.strCategory}</h3>
    </div>
    <div class="quad">
      <h3><span class="white">Glass type:</span><br> ${cocktail.strGlass}</h3>
    </div>
    <div class="quad quad__column">
      <h3>
        <span class="white">Ingredients:</span>
      </h3>
      <ul class="quad__list">
        <li class="quad__list--item"><b>Creme de Cacao</b></li>
        <li class="quad__list--item"><b>Vodka</b></li></li>
      </ul>
    </div>
    <div class="quad quad__column">
      <h3>
        <span class="white ingredient">Measure:</span>
      </h3>
      <ul class="quad__list">
        <li class="quad__list--item"><b>1 oz white</b></li>
        <li class="quad__list--item"><b>1 oz</b></li>
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
  <img
            class="cocktail__textarea--img"
            src="${cocktail.strDrinkThumb}"
            alt=""
          />`;
}

renderCocktail(id);
