// src/app/components/RecipeForm.tsx
'use client'

import { useState } from 'react'

interface RecipeFormProps {
  onAddRecipe: (recipe: { name: string; ingredients: string; instructions: string }) => void
}

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && ingredients && instructions && !isSubmitting) {
      setIsSubmitting(true)
      
      try {
        await onAddRecipe({
          name,
          ingredients,
          instructions
        })
        
        // Clear form only if successful
        setName('')
        setIngredients('')
        setInstructions('')
      } catch (error) {
        console.error('Error submitting recipe:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-rose-200">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLgGTPUDH6UGAbm/giphy.gif" 
          alt="Cute cartoon cooking bear"
          className="w-16 h-16 rounded-full mr-3"
        />
        <h2 className="text-2xl font-bold text-slate-700">Add New Recipe</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-600 font-semibold mb-2">
            🍽️ Dish Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter dish name..."
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-2">
            🥕 Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="List ingredients (one per line or comma-separated)..."
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 h-24 resize-none"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-2">
            📝 Recipe Instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Write the step-by-step instructions..."
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 h-32 resize-none"
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-300 hover:bg-green-400 disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md"
        >
          {isSubmitting ? '🔄 Saving...' : '🍳 Save Recipe'}
        </button>
      </form>
    </div>
  )
}