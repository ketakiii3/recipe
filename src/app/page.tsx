'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import SearchBar from './components/SearchBar'
import TenorGifEmbed from './components/TenorGifEmbed'
import BottomGifGallery from './components/BottomGifGallery'

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

  // Load recipes from Supabase on component mount
  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

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
      
      const { data, error } = await supabase
        .from('recipes')
        .insert([recipe])
        .select()

      if (error) {
        throw error
      }

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
      
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-700 mb-2">
            🍳 Ketaki's Recipe App 🍳
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-slate-600">To store and search my favorite recipes</p>
              <p className="text-slate-600">And for YOU to try them out</p>
            </div>
            <div className="flex-shrink-0">
              <TenorGifEmbed 
                postId="8393027935639589957" 
                aspectRatio="1" 
                width="60px"
                className="rounded-full shadow-md"
              />
            </div>
          </div>

          
          <div className="mt-6 flex justify-center items-center gap-6">
            <div className="flex-shrink-0">
              <TenorGifEmbed 
                postId="11325156789911759579" 
                aspectRatio="1" 
                width="120px"
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="flex-shrink-0">
              <TenorGifEmbed 
                postId="14041695" 
                aspectRatio="1" 
                width="140px"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Add Recipe Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-300 hover:bg-rose-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
          >
            {showForm ? '✖️ Cancel' : '➕ Add New Recipe'}
          </button>
        </div>

        {/* Recipe Form */}
        {showForm && <RecipeForm onAddRecipe={addRecipe} />}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-300 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading recipes...</p>
          </div>
        ) : (
          /* Recipe List */
          <RecipeList 
            recipes={filteredRecipes} 
            onDeleteRecipe={deleteRecipe}
            searchTerm={searchTerm}
          />
        )}

        {/* Bottom GIF Gallery - Only show after recipes */}
        {!loading && <BottomGifGallery />}
      </main>
    </div>
  )
}