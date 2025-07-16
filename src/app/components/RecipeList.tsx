// src/app/components/RecipeList.tsx
'use client'

import RecipeCard from './RecipeCard'

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
  created_at: string
}

interface RecipeListProps {
  recipes: Recipe[]
  onDeleteRecipe: (id: number) => void
  searchTerm: string
}

export default function RecipeList({ recipes, onDeleteRecipe, searchTerm }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif" 
          alt="Cute cooking panda"
          className="mx-auto w-32 h-32 rounded-full mb-4"
        />
        <p className="text-gray-600 text-lg">
          {searchTerm ? 'No recipes found matching your search' : 'No recipes yet! Add your first recipe above.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onDelete={onDeleteRecipe}
        />
      ))}
    </div>
  )
}