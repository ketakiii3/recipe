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

  // Cartoon cooking animal GIFs array
  const cookingAnimalGifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btNa0RUYa5E7iiQ/giphy.gif', // Cooking cat
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLgGTPUDH6UGAbm/giphy.gif', // Cooking bear
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je66zG6mAAZxgqI/giphy.gif', // Cooking panda
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif', // Cooking panda chef
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgG50Fb7Mi0prBC/giphy.gif', // Cooking dog
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FL6gRw6M2DdQZsI/giphy.gif', // Cooking pig
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je3Y7aWbKMBD8xG/giphy.gif', // Cooking rabbit
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLgGTPUDH6UGAbm/giphy.gif', // Cooking bear 2
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-700 flex-1">{recipe.name}</h3>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-500 disabled:text-slate-300 font-bold text-lg"
          title="Delete recipe"
        >
          {isDeleting ? '🔄' : '🗑️'}
        </button>
      </div>

      <div className="text-sm text-slate-500 mb-4">
        Added on {formatDate(recipe.created_at)}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-slate-600 mb-2">🥕 Ingredients:</h4>
        <p className="text-slate-600 text-sm whitespace-pre-line">
          {expanded ? recipe.ingredients : recipe.ingredients.slice(0, 100) + (recipe.ingredients.length > 100 ? '...' : '')}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-slate-600 mb-2">📝 Instructions:</h4>
        <p className="text-slate-600 text-sm whitespace-pre-line">
          {expanded ? recipe.instructions : recipe.instructions.slice(0, 150) + (recipe.instructions.length > 150 ? '...' : '')}
        </p>
      </div>

      {(recipe.ingredients.length > 100 || recipe.instructions.length > 150) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-rose-400 hover:text-rose-500 font-semibold text-sm"
        >
          {expanded ? '🔼 Show Less' : '🔽 Show More'}
        </button>
      )}

      {/* Cartoon cooking animal GIF for each recipe */}
      <div className="mt-4 text-center">
        <img 
          src={cookingAnimalGifs[recipe.id % cookingAnimalGifs.length]}
          alt="Cute cartoon cooking animal"
          className="w-12 h-12 rounded-full mx-auto opacity-80"
        />
      </div>
    </div>
  )
}