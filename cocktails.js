const strDrink = localStorage.getItem("strDrink");
console.log(strDrink);

async function main() {
  const cocktails = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${strDrink}`
  );
  const categories = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
  );
  //cocktails
  const cocktailsDataObject = await cocktails.json();
  const cocktailsData = cocktailsDataObject["drinks"];
  const cocktailListEl = document.querySelector(".cocktail__container");

  //cocktail categories
  const categoriesDataObject = await categories.json();
  const categoriesData = categoriesDataObject["drinks"];
  const categoryListEl = document.querySelector("#type");

  //cocktail map
  if (cocktailsData !== null) {
    cocktailListEl.innerHTML = cocktailsData
      .map((cocktail) => cocktailHTML(cocktail))
      .join("");
  } else {
    cocktailListEl.innerHTML = `<h1>No results found.</h1>`;
  }

  //category map
  categoryListEl.innerHTML = categoriesData
    .map((category) => categoryHTML(category))
    .join("");
}

main();

function cocktailHTML(cocktail) {
  return `<div class="cocktail" onclick="showCocktailDetails(${cocktail.idDrink})">
  <img
    src="${cocktail.strDrinkThumb}"
    alt="cocktail__img"
    class="cocktail__img"
  />
  <div class="cocktail__description">
    <h3 class="cocktail__description--title">${cocktail.strDrink}</h3>
    <p class="cocktail__description--isAlcoholic">${cocktail.strAlcoholic}</p>
    <p class="cocktail__description--category">
      Category: <br />
      <b>${cocktail.strCategory}</b>
    </p>
  </div>
</div>`;
}

function categoryHTML(category) {
  return `<option value="${category.strCategory}">${category.strCategory}</option>`;
}

function showCocktailDetails(id) {
  localStorage.setItem("id", id);
  window.location.href = `cocktail.html`;
}
