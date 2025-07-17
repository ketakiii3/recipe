// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import SearchBar from './components/SearchBar'

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
  created_at: string
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // This hook fetches the recipes when the component first loads.
  useEffect(() => {
    fetchRecipes()
  }, [])

  // (The fetch, add, and delete functions are the same as before)
  const fetchRecipes = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.from('recipes').select('*').order('created_at', { ascending: false })
      if (error) { throw error }
      setRecipes(data || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setError('Failed to load recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
    try {
      setError(null)
      const { data, error } = await supabase.from('recipes').insert([recipe]).select()
      if (error) { throw error }
      if (data && data.length > 0) {
        setRecipes([data[0], ...recipes])
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error adding recipe:', error)
      setError('Failed to add recipe. Please try again.')
    }
  }
  const deleteRecipe = async (id: number) => {
    try {
      setError(null)
      const { error } = await supabase.from('recipes').delete().eq('id', id)
      if (error) { throw error }
      setRecipes(recipes.filter(recipe => recipe.id !== id))
    } catch (error) {
      console.error('Error deleting recipe:', error)
      setError('Failed to delete recipe. Please try again.')
    }
  }

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // These are the specific GIFs you wanted for the bottom of the page.
  const footerGifs = [
    'https://tenor.com/en-GB/view/milk-and-mocha-coffee-pour-gif-14041695',
    'https://tenor.com/en-GB/view/cooking-gif-2970283722082638544',
    'https://tenor.com/en-GB/view/かみ太-gif-2456354674379385637',
    'https://tenor.com/en-GB/view/cat-eating-cat-noodle-noodle-cat-cat-eating-noodles-gif-12001693143160973743',
    'https://tenor.com/en-GB/view/thiqng14-gif-5502216684355563408'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          
          {/* This is the huge header GIF you requested. */}
          <div className="mb-4">
            <img 
              src="https://tenor.com/en-GB/view/mochi-mochimon-mochimons-kawaii-kitty-gif-11325156789911759579"
              alt="Cute mochi cat"
              // I made the GIF larger as you wanted.
              className="mx-auto w-full max-w-sm h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="tenor-gif-embed" data-postid="11325156789911759579" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/mochi-mochimon-mochimons-kawaii-kitty-gif-11325156789911759579">Mochi Mochimon GIF</a>from <a href="https://tenor.com/search/mochi-gifs">Mochi GIFs</a></div>
          {/* <script type="text/javascript" async src="https://tenor.com/embed.js"></script> */}

          <h1 className="text-4xl font-bold text-slate-700 mb-2">
            🍳 Cutesy Recipe App 🍳
          </h1>
          <p className="text-slate-600">Store and search your favorite recipes</p>
        </div>

        {/* (The main content structure is the same...) */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">{error}</div>
        )}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
          >
            {showForm ? '✖️ Cancel' : '➕ Add New Recipe'}
          </button>
        </div>
        {showForm && <RecipeForm onAddRecipe={addRecipe} />}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading recipes...</p>
          </div>
        ) : (
          <RecipeList recipes={filteredRecipes} onDeleteRecipe={deleteRecipe} searchTerm={searchTerm}/>
        )}

        {/* This is the new footer section with your selected GIFs. */}
        <div className="mt-16 pt-8 border-t-2 border-orange-100">
          <h2 className="text-2xl text-center font-bold text-slate-600 mb-6">✨ Just For Fun ✨</h2>
          {/* This grid displays the footer GIFs. */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {footerGifs.map((gifUrl, index) => (
              <div key={index} className="bg-white p-2 rounded-lg shadow-md">
                <img 
                  src={gifUrl} 
                  alt={`Cute footer gif ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}