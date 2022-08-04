const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



const {getRecipes, createRecipe, deleteRecipe}= require('./controller.js')

app.get('/api/recipes', getRecipes);
app.post('/api/recipes/', createRecipe);
app.delete('/api/recipes/:id', deleteRecipe);

app.listen(3030, () => console.log('listening on port 3030'));