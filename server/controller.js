let recipes =require('./dB.json');
let globalID = 4;

module.exports = {
    getRecipes:(req,res) => {
        res.status(200).send(recipes) 
    },

    createRecipe:(req, res) => {
        // console.log(req.body) //what is this doing?
        const{name, creator, ingredients, directions}=req.body;
        let newRecipe = {
            id:globalID,
            name,
            creator, 
            ingredients,
            directions
        }

        if (!name|| !ingredients || !directions){
            res.status(400).send('Missing some information')
        } else {
        recipes.push(newRecipe);
        globalID++;
        res.status(200).send(recipes)
        }

    },

    deleteRecipe: (req,res) => {
        let index =recipes.findIndex(elem => elem.id=== +req.params.id)
        recipes.splice(index, 1);
        res.status(200).send(recipes)
    }

    
}