'use client'

import { useState } from 'react'
import TenorGifEmbed from './TenorGifEmbed'

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

  // Pre-selected cooking GIFs for recipe cards
  const cookingGifIds = [
    "2970283722082638544",    // cooking-gif
    "9272610758073942574",    // chef-pwaty-cooking
    "6485465384176810832",    // cat-huh-tired-exhausted
    "10800793942039113409",   // emmytesting586
    "18442661682198157862",   // birbhaus-cooking-cute
    "20152387",               // chefcat-cat-chef
    "27290245",               // tkthao219-peach-goma
    "14801096915973119105",    // cat-cooking-let-me-cook
    "17988320",
    "5567007998101975297",
    "17451525928232210672",
    "2019117850281892669",
    "20571281"
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

      {/* Tenor GIF for each recipe */}
      <div className="mt-4 text-center">
        <TenorGifEmbed 
          postId={cookingGifIds[recipe.id % cookingGifIds.length]}
          aspectRatio="1"
          width="48px"
          className="mx-auto opacity-80 rounded-full shadow-sm"
        />
      </div>
    </div>
  )
}
