'use client'

import RecipeCard from './RecipeCard'
import TenorGifEmbed from './TenorGifEmbed'

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
        <div className="mb-6">
          <TenorGifEmbed 
            postId="6485465384176810832" 
            aspectRatio="1" 
            width="128px"
            className="mx-auto rounded-full shadow-lg"
          />
        </div>
        <p className="text-slate-600 text-lg">
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