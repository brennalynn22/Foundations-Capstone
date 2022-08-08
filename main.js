

const recipeContainer= document.querySelector('#recipe-container')
const form = document.querySelector('form')


const baseURL =`http://localhost:3030/api/recipes`

const recipeCallback =({data:recipes}) => displayRecipes(recipes)
const errCallback = err => console.log(err.response.data)

const getAllRecipes = () => axios.get(baseURL).then(recipeCallback).catch(errCallback)
const createRecipe = body => axios.post(baseURL, body).then(recipeCallback).catch((err)=>alert(err))
const deleteRecipe = id => axios.delete(`${baseURL}/${id}`).then(recipeCallback).catch(errCallback)

function submitHandler(e){
    e.preventDefault()



    let name = document.querySelector('#name')
    let creator = document.querySelector('#creator')
    let ingredients = document.querySelector('#ingredients')
    let directions = document.querySelector('#directions')

    let bodyObj = {
        name: name.value,
        creator: creator.value, 
        ingredients: ingredients.value,
        directions: directions.value

    }
    // if (name.value === null) {
    //     alert ('You must enter a name')
    //     return
    // } 
    // if (ingredients.value === null){
    //     alert ('You must enter the ingredients')
    //     return
    // }
    // if (directions.value === null){
    //     alert ('You must enter directions')
    //     return
    // }
    createRecipe(bodyObj)

    name.value =''
    creator.value = ''
    ingredients.value = ''
    directions.value = ''
}

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `<div class="recipeBody">
    <p id="name2"><span id="title2">Recipe:   </span>${recipe.name}</p>
    <p id="creator2"><span id="from2">From:   </span>${recipe.creator}</p>
    <p id="ingredientsTemplate">Ingredients:</p>
    <p id="ingredients2">${recipe.ingredients}</p>
    <p id="directionsTemplate">Directions:</p>
    <p id="directions2">${recipe.directions}</p>
    </div>
    <div id="commentSection"></div>
    <div class="btns-container">
        <button class="btns-container" id="editBtn-${recipe.id}" type="button">Edit Recipe</button>
        <button id="commentBtn" onclick="addComment()">Comment</button>
        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
    </div> 
    `
    recipeContainer.appendChild(recipeCard)
    editBtn()
}

function displayRecipes(arr){
    recipeContainer.innerHTML =``
    for (let i=0; i< arr.length; i++){
        createRecipeCard(arr[i])
    }
}
form.addEventListener('submit', submitHandler)


function editBtn() {


const editBtn= document.querySelector('#editBtn-1');
const editables = document.querySelectorAll('#name2, #creator2, #ingredients2, #directions2')
console.log(editBtn)
if(editBtn){
editBtn.addEventListener('click', (e)=> {
    console.log(e.target)
   if (!editables[0].isContentEditable) {
    editables[0].contentEditable = 'true';
    editables[1].contentEditable = 'true';
    editables[2].contentEditable = 'true';
    editables[3].contentEditable = 'true';
    editBtn.innerHTML = 'Save Changes';
    editBtn.style.backgroundColor ='rgb(61,61,91)';
    editBtn.style.color= "rgb(244,241,222)";

   } else {
    //disable editing
    editables[0].contentEditable = 'false';
    editables[1].contentEditable = 'false';
    editables[2].contentEditable = 'false';
    editables[3].contentEditable = 'false';
    //change button text and color
    editBtn.innerHTML= "Edit Recipe";
    editBtn.style.backgroundColor = 'rgb(129,178,154)';
    //save the data in localStorage 
    for (let i=0; i<editables.length;i++){
        localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
    }

   }

}
)}}

function addComment (){
    const x= document.getElementById("commentSection");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else { 
        x.style.display = "none";

    }
}
getAllRecipes()