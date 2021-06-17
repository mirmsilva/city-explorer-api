//Node tester
console.log('hello from node!');

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const axios = require('axios');

const PORT = process.env.PORT;

//Tester
app.get('/',(req,res)=>{
  res.send('This server is working!');
});

//since this will take a while use sync & await
app.get('/pictures', async (req,res)=>{
  let searchQuery = req.query.searchQuery;
  //make the request using axios to unsplash
  let unsplashData = await axios.get(`'the url you need here/search/photos?query=${searchQuery}&client_id=${process.env.YOUR_ACCESS_KEY}'`)
  //send the picture data
  res.send(unsplashData.data.results); 
})
//Catch All Error Message
app.get('/*', (request, response)=>{
  response.status(404).send('Sorry, We Only Have Information on Seattle, Amman & Paris, Please Try Again!')
});
//tell the server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});
