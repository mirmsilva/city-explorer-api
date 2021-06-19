//Day 10 Demo
//storing & pulling items from cache

const axios = require('axios');

// this cache holds recently made requests to edamam
// key: ingredient
// value: {
//   timestamp: when the data was saved
//   recipes: array of recipe data, ready to be sent back to the client
// }
let cache = {};

function getRecipes(request, response) {
  const ingredient = request.query.ingredient;
  if(cache[ingredient] &&
    // check that it was saved in the last week
    Date.now() - cache[ingredient].timestamp < (1000 * 60 * 60 * 24 * 7)) {
    // we have a cache hit! that request was made and we've stored the data already in our cache
    console.log('cache hit, yay');
    response.send(cache[ingredient].recipes);
  } else {
    // we have a cache miss! that ingredient is "new", nobody has searched for it recently
    // make the request & store the response in our cache for next time
    console.log('cache miss, boo');
    const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

    axios
      .get(url)
      .then(res => {
        const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
        // save the recipe data into the cache for next time
        cache[ingredient] = {
          timestamp: Date.now(),
          recipes: recipeArr
        };
        response.status(200).send(recipeArr);
      })
      .catch(err => {
        console.log('error', err);
        response.status(500).send('error', err);
      });
  }
}

class Recipe {
  constructor(recipe) {
    this.uri = recipe.uri;
    this.label = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipe.totalTime;
  }
}

module.exports = getRecipes;