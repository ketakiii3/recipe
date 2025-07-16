// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import SearchBar from './components/SearchBar'

// This defines the structure of a recipe object.
interface Recipe {
 id: number
 name: string
 ingredients: string
 instructions: string
 created_at: string
}

export default function Home() {
 // This state holds the list of all recipes.
 const [recipes, setRecipes] = useState<Recipe[]>([])
 // This state holds the current search term.
 const [searchTerm, setSearchTerm] = useState('')
 // This state controls whether the add recipe form is shown.
 const [showForm, setShowForm] = useState(false)
 // This state indicates if the recipes are currently being loaded.
 const [loading, setLoading] = useState(true)
 // This state holds any error messages.
 const [error, setError] = useState<string | null>(null)

 // This hook fetches the recipes from the database when the component first loads.
 useEffect(() => {
 fetchRecipes()
 }, [])

 // This asynchronous function fetches all recipes from the 'recipes' table in Supabase.
 const fetchRecipes = async () => {
 try {
 // Set loading to true while fetching data.
 setLoading(true)
 // Clear any previous errors.
 setError(null)
 
 // This is the Supabase query to get all recipes.
 const { data, error } = await supabase
 .from('recipes')
 .select('*')
 .order('created_at', { ascending: false }) // Order by creation date, newest first.

 // If there's an error, throw it to be caught by the catch block.
 if (error) {
 throw error
 }

 // Set the recipes state with the fetched data.
 setRecipes(data || [])
 } catch (error) {
 // Log the error to the console.
 console.error('Error fetching recipes:', error)
 // Set an error message to be displayed to the user.
 setError('Failed to load recipes. Please try again.')
 } finally {
 // Set loading to false after the fetch is complete.
 setLoading(false)
 }
 }

 // This asynchronous function adds a new recipe to the database.
 const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
 try {
 // Clear any previous errors.
 setError(null)
 
 // This is the Supabase query to insert a new recipe.
 const { data, error } = await supabase
 .from('recipes')
 .insert([recipe])
 .select()

 // If there's an error, throw it.
 if (error) {
 throw error
 }

 // If the insertion was successful, update the recipes state.
 if (data && data.length > 0) {
 setRecipes([data[(0)], ...recipes])
 // Hide the form after adding a recipe.
 setShowForm(false)
 }
 } catch (error) {
 // Log the error.
 console.error('Error adding recipe:', error)
 // Set an error message.
 setError('Failed to add recipe. Please try again.')
 }
 }

 // This asynchronous function deletes a recipe from the database.
 const deleteRecipe = async (id: number) => {
 try {
 // Clear any previous errors.
 setError(null)
 
 // This is the Supabase query to delete a recipe by its id.
 const { error } = await supabase
 .from('recipes')
 .delete()
 .eq('id', id)

 // If there's an error, throw it.
 if (error) {
 throw error
 }

 // Update the recipes state to remove the deleted recipe.
 setRecipes(recipes.filter(recipe => recipe.id !== id))
 } catch (error) {
 // Log the error.
 console.error('Error deleting recipe:', error)
 // Set an error message.
 setError('Failed to delete recipe. Please try again.')
 }
 }

 // This filters the recipes based on the search term.
 const filteredRecipes = recipes.filter(recipe =>
 recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
 )

 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
 <main className="container mx-auto px-4 py-8 max-w-4xl">
 {/* Header Section */}
 <div className="text-center mb-8">
 <h1 className="text-4xl font-bold text-slate-700 mb-2">
 🍳 Cutesy Recipe App 🍳
 </h1>
 {/* Cute cat GIF added here! */}
 <img
 src="https://media.tenor.com/Em49nJtCz9gAAAAC/cute-cat-kitty.gif"
 alt="Cute cat GIF"
 className="mx-auto w-32 h-32 rounded-full shadow-lg mb-4"
 />
 <p className="text-slate-600">Store and search your favorite recipes</p>
 
 {/* Cute cartoon cooking animal GIF */}
 <div className="mt-4">
 <img 
 src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btNa0RUYa5E7iiQ/giphy.gif" 
 alt="Cute cooking cartoon animal"
 className="mx-auto w-24 h-24 rounded-full shadow-lg"
 />
 </div>
 </div>

 {/* Error Message Display */}
 {error && (
 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
 {error}
 </div>
 )}

 {/* Search Bar Component */}
 <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

 {/* Add Recipe Button */}
 <div className="text-center mb-8">
 <button
 onClick={() => setShowForm(!showForm)}
 // Changed the button color to a pastel blue.
 className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
 >
 {showForm ? '✖️ Cancel' : '➕ Add New Recipe'}
 </button>
 </div>

 {/* Recipe Form Component (conditionally rendered) */}
 {showForm && <RecipeForm onAddRecipe={addRecipe} />}

 {/* Loading State Indicator */}
 {loading ? (
 <div className="text-center py-12">
 {/* Changed the spinner color to pastel blue. */}
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300 mx-auto mb-4"></div>
 <p className="text-slate-600">Loading recipes...</p>
 </div>
 ) : (
 /* Recipe List Component */
 <RecipeList 
 recipes={filteredRecipes} 
 onDeleteRecipe={deleteRecipe}
 searchTerm={searchTerm}
 />
 )}
 </main>
 </div>
 )
}