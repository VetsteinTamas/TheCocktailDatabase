const cocktailDataEl = document.querySelector(".cocktail-list");
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
  return `<div class="post">
  <div class="post__title">
    ${cocktail.strDrink}
  </div>
  <p class="post__body">
  </p>
  </div>`;
}

renderCocktail(id);
