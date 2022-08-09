
const recipeContainer= document.querySelector('#recipe-container')
const form = document.querySelector('form')


const baseURL =`http://localhost:3030/api/recipes`

const recipeCallback =({data:recipes}) => displayRecipes(recipes)
const errCallback = err => console.log(err)

const getAllRecipes = () => axios.get(baseURL).then(recipeCallback).catch(errCallback)
const createRecipe = body => axios.post(baseURL, body).then(recipeCallback).catch((err)=>alert(err))
const deleteRecipe = id => axios.delete(`${baseURL}/${id}`).then(recipeCallback).catch(errCallback)

const updateComment= (id, body) => axios.put(`${baseURL}/${id}`,body).then(recipeCallback).catch(errCallback)

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
        directions: directions.value,
        comments:""

    }
   
    createRecipe(bodyObj)

    name.value =''
    creator.value = ''
    ingredients.value = ''
    directions.value = ''
}

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')
//split recipe into array, on array map forEach item in array mkae p tag for each 
    recipeCard.innerHTML = `<div class="recipeBody">
    <p class="name2" id="name2-${recipe.id}"><span class="title2" id="title2-${recipe.id}">Recipe:   </span>${recipe.name}</p>
    <input type="checkbox" class="favoriteCheck" id="favoriteCheck-${recipe.id}
    <p class="creator2" id="creator2-${recipe.id}"><span id="from2-${recipe.id}">From:   </span>${recipe.creator}</p>
    <p class="ingredientsTemplate" id="ingredientsTemplate-${recipe.id}">Ingredients:</p>
    <p class="ingredients2" id="ingredients2-${recipe.id}"></p>
    <p class="directionsTemplate" id="directionsTemplate-${recipe.id}">Directions:</p>
    <p class="directions2" id="directions2-${recipe.id}">${recipe.directions}</p>
    
     <div class="commentSection" id="commentSectionId">
        <label for="newComment" id="commentHeader-${recipe.id}">Note:</label>
       <textarea type="text"class="textareaComment" id="newComment-${recipe.id}" placeholder="Enter Note"></textarea>
        <div id="allComments-${recipe.id}">${recipe.comments}</div>
        
    </div>
    <div class="btns-container">
        <button class="btns-container" id="editBtn-${recipe.id}" type="button">Edit Recipe</button>
        <button id="commentBtn-${recipe.id}">Add Comment</button>
        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
    </div>
    </section> 
    </div>
    `
//select id with ingredients2-id, split recipe string into arrray by commma , for each itme in array make a p tag that has the text, then append to element I selecet with ingredients2-id

    recipeContainer.appendChild(recipeCard)
    editBtn(recipe.id)
    addComment(recipe.id)
   
}

function displayRecipes(arr){
    recipeContainer.innerHTML =``
    for (let i=0; i< arr.length; i++){
        createRecipeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)


function editBtn(id) {


const editBtn= document.querySelector(`#editBtn-${id}`);
const editables = document.querySelectorAll(`#name2-${id}, #creator2-${id}, #ingredients2-${id}, #directions2-${id}`)

if(editBtn){
editBtn.addEventListener('click', (e)=> {
    console.log(e.target)
   if (!editables[0].isContentEditable) {
    editables[0].contentEditable = 'true';
    editables[1].contentEditable = 'true';
    editables[2].contentEditable = 'true';
    editables[3].contentEditable = 'true';
    editBtn.innerHTML = 'Save Changes';
    editBtn.style.backgroundColor = 'rgb(129,178,154)';
    editBtn.style.color='rgb(61,61,91)'
    

   } else {
    //disable editing
    editables[0].contentEditable = 'false';
    editables[1].contentEditable = 'false';
    editables[2].contentEditable = 'false';
    editables[3].contentEditable = 'false';
    //change button text and color
    editBtn.innerHTML= "Edit Recipe";
    
    editBtn.style.backgroundColor ='rgb(61,61,91)';
    editBtn.style.color= "rgb(244,241,222)";
    //save the data in localStorage 
    for (let i=0; i<editables.length;i++){
        localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
    }

   }

}
)}}
// let editedRecipeCard = JSON.parse(window.localStorage.getItem('editedRecipeCard'));
// console.log(editedRecipeCard)

// function addComment (){
//     const comment= document.getElementById("commentSection");
//     // comment.addEventListener("click", )
//     const displaySetting= comment.style.display;
//     const commentBtn= document.getElementById('commentBtn');

//     if (comment.style.display === "none"){
//         comment.style.display = "block";
//     } else { 
//         comment.style.display = "none";

//     }
// }


function addComment(id) {

 const commentContainer = document.getElementById(`allComments-${id}`);

    
    const textBox = document.createElement('div');
    const wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrapper';
    wrapDiv.style.marginLeft = 0;
    let commentText = document.getElementById(`newComment-${id}`);
    console.log(commentText.value)
    
    textBox.innerHTML = commentText.value;
    document.getElementById(`newComment-${id}`).value = '';
    wrapDiv.append(textBox);
    commentContainer.appendChild(wrapDiv);
    document.getElementById(`commentBtn-${id}`).addEventListener('click', function (ev) {
        updateComment(id, {comments:commentText.value});
      
      });  
}


getAllRecipes()