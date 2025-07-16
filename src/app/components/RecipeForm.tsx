// src/app/components/RecipeForm.tsx
'use client'

import { useState } from 'react'

// This defines the properties that the RecipeForm component will accept.
interface RecipeFormProps {
  onAddRecipe: (recipe: { name: string; ingredients: string; instructions: string }) => void
}

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {
  // This state holds the name of the recipe.
  const [name, setName] = useState('')
  // This state holds the ingredients for the recipe.
  const [ingredients, setIngredients] = useState('')
  // This state holds the instructions for the recipe.
  const [instructions, setInstructions] = useState('')
  // This state indicates if the form is currently being submitted.
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This function handles the form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission behavior.
    e.preventDefault()
    // Check if the form is valid and not already submitting.
    if (name && ingredients && instructions && !isSubmitting) {
      // Set submitting state to true.
      setIsSubmitting(true)
      
      try {
        // Call the onAddRecipe function passed as a prop.
        await onAddRecipe({
          name,
          ingredients,
          instructions
        })
        
        // Clear the form fields after a successful submission.
        setName('')
        setIngredients('')
        setInstructions('')
      } catch (error) {
        // Log any errors during submission.
        console.error('Error submitting recipe:', error)
      } finally {
        // Set submitting state back to false.
        setIsSubmitting(false)
      }
    }
  }

  return (
    // Changed the border color to pastel blue.
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
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
            // Changed the focus ring color to pastel blue.
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            // Changed the focus ring color to pastel blue.
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 h-24 resize-none"
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
            // Changed the focus ring color to pastel blue.
            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 h-32 resize-none"
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