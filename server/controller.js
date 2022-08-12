let recipes =require('./dB.json');
let globalID = 5;

module.exports = {
    getRecipes:(req,res) => {
        res.status(200).send(recipes) 
    },

    createRecipe:(req, res) => {
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
    },

    updateComment: (req, res) => {
     let index =recipes.findIndex(elem => elem.id=== +req.params.id)
     let newComment =req.body.comments
     console.log(req.body)
     for (let i=0;i<recipes.length; i++){
            if (recipes[index].comments===''){
                recipes[index].comments += newComment
            } else {
                recipes[index].comments +=", " + newComment
            }

            console.log(recipes[index])
            res.status(200).send(recipes)
            return
        
     } 
     res.status(400).send("comment not updated.")
    }
}