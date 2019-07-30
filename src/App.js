import React, {useState, useEffect} from 'react'
import Recipe from './component/Recipe'
import './App.css';

const App = () => {
  const App_ID = 'f98aa4b1'
  const APP_Key = '87072a7a166b2b0e5671dba2528fa953'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  
 useEffect(() => {
   getRecipes()
 }, [query])

 const getRecipes = async () => {
   const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${ APP_Key}`
   )
   const data = await response.json()
   setRecipes(data.hits)
   console.log(data.hits)
 }

 const updateSearch = (e) => {
  setSearch(e.target.value)
 
 }

 const getSearch = e => {
   e.preventDefault()
   setQuery(search)
   setSearch('')
 }
 
  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text'
         onChange={updateSearch}
        />
        <button className='search-button' type='submit'>
         Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe key={recipe.recipe.label}
         title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
       />
      ))}
      </div>
    </div>
  )
}

export default App;
