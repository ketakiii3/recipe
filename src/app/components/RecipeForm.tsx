'use client'

import { useState } from 'react'

interface Recipe {
  name: string
  ingredients: string
  instructions: string
}

interface RecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void
}

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    ingredients: '',
    instructions: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (recipe.name && recipe.ingredients && recipe.instructions) {
      onAddRecipe(recipe)
      setRecipe({ name: '', ingredients: '', instructions: '' })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">Add New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({...recipe, name: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter recipe name..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Ingredients
          </label>
          <textarea
            value={recipe.ingredients}
            onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={4}
            placeholder="List ingredients..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Instructions
          </label>
          <textarea
            value={recipe.instructions}
            onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={6}
            placeholder="Write cooking instructions..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-300 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          🍳 Save Recipe
        </button>
      </form>
    </div>
  )
}