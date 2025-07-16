// src/app/components/RecipeCard.tsx
'use client'

import { useState } from 'react'

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
  created_at: string
}

interface RecipeCardProps {
  recipe: Recipe
  onDelete: (id: number) => void
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setIsDeleting(true)
      try {
        await onDelete(recipe.id)
      } catch (error) {
        console.error('Error deleting recipe:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  // Format the created_at date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{recipe.name}</h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-700 disabled:text-gray-400 font-bold text-lg"
          title="Delete recipe"
        >
          {isDeleting ? '🔄' : '🗑️'}
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Added on {formatDate(recipe.created_at)}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">🥕 Ingredients:</h4>
        <p className="text-gray-600 text-sm whitespace-pre-line">
          {expanded ? recipe.ingredients : recipe.ingredients.slice(0, 100) + (recipe.ingredients.length > 100 ? '...' : '')}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">📝 Instructions:</h4>
        <p className="text-gray-600 text-sm whitespace-pre-line">
          {expanded ? recipe.instructions : recipe.instructions.slice(0, 150) + (recipe.instructions.length > 150 ? '...' : '')}
        </p>
      </div>

      {(recipe.ingredients.length > 100 || recipe.instructions.length > 150) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-pink-500 hover:text-pink-700 font-semibold text-sm"
        >
          {expanded ? '🔼 Show Less' : '🔽 Show More'}
        </button>
      )}

      {/* Random cooking animal GIF for each recipe */}
      <div className="mt-4 text-center">
        <img 
          src={`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/${['3o7btNa0RUYa5E7iiQ', 'l2Je66zG6mAAZxgqI', 'xT9IgG50Fb7Mi0prBC', 'JIX9t2j0ZTN9S'][recipe.id % 4]}/giphy.gif`}
          alt="Cute cooking animal"
          className="w-12 h-12 rounded-full mx-auto opacity-70"
        />
      </div>
    </div>
  )
}