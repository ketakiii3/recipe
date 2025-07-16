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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍳 Cutesy Recipe App 🍳
          </h1>
          <p className="text-gray-600">Store and search your favorite recipes</p>
          
          {/* Cute cooking animal GIF */}
          <div className="mt-4">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btNa0RUYa5E7iiQ/giphy.gif" 
              alt="Cute cooking cat"
              className="mx-auto w-24 h-24 rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Add Recipe Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
          >
            {showForm ? '✖️ Cancel' : '➕ Add New Recipe'}
          </button>
        </div>

        {/* Recipe Form */}
        {showForm && <RecipeForm onAddRecipe={addRecipe} />}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recipes...</p>
          </div>
        ) : (
          /* Recipe List */
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