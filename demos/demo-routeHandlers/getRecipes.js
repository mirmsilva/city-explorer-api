//Demo Day 10
//shows how to cache information so that you are not going to the API for every similar request
const axios = require('axios');
const { response } = require('express');

//cache
//key: ingredient
//value: array of recipe data, ready to be sent back to client
//value: {timestamp and recipe arr}

let cache ={};

function getRecipes(req, res){
  const ingredient = request.query.ingredient;
  if(cache[ingredient] &&
    Date.now()-cache[ingredient].timestamp <(1000*60*60*24*7)){
    response.send(cache[ingredient].recipes);
  }else{
    const url = `website API`;

    axios
      .get(url)
      .then(res =>{
        const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
        cache[ingredient] = {
          timestamp: Date.now(),
          recipes: recipeArr
        };
        response.status(200).send(recipeArr);
      })
      .catch(err =>{
        console.log('error', err);
        response.status(500).send('error', err);
      });
  }
}

class Recipe{
  constructor(recipe){
    this.uri = recipe.uri;
    this.label = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipeTotalTime;
  }
}

module.exports = getRecipes;