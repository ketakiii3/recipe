// src/app/components/RecipeCard.tsx
'use client'

// This hook is imported from React to manage component state.
import { useState } from 'react'

// This defines the data structure for a single recipe object.
interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
  created_at: string
}

// This defines the props (properties) the RecipeCard component will receive.
interface RecipeCardProps {
  recipe: Recipe // The recipe data to display.
  onDelete: (id: number) => void // A function to call when the delete button is clicked.
}

// This is the main function for the RecipeCard component.
export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  // This state variable tracks if the card details are expanded or collapsed.
  const [expanded, setExpanded] = useState(false)
  // This state variable tracks if the delete operation is in progress.
  const [isDeleting, setIsDeleting] = useState(false)

  // This function handles the delete button click.
  const handleDelete = async () => {
    // This shows a browser confirmation pop-up before proceeding.
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      // Sets the isDeleting state to true to show a loading state on the button.
      setIsDeleting(true)
      try {
        // Calls the onDelete function passed down from the parent component.
        await onDelete(recipe.id)
      } catch (error) {
        // Logs any potential error to the browser console.
        console.error('Error deleting recipe:', error)
      } finally {
        // Sets isDeleting back to false after the operation is complete.
        setIsDeleting(false)
      }
    }
  }

  // This helper function formats the timestamp into a readable date string.
  const formatDate = (dateString: string) => {
    // Creates a new Date object from the string.
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', // e.g., 2025
      month: 'short',  // e.g., Jul
      day: 'numeric'   // e.g., 17
    })
  }

  // ✨ Here's the new and improved array of cartoon animal cooking GIFs from the links you sent!
  const cookingAnimalGifs = [
    'https://media.tenor.com/sKCsGjA3M5AAAAAC/cute-cat.gif', // Cat chef
    'https://media.tenor.com/rB1qPq2yQJgAAAAC/cooking-dog.gif', // Snoopy making pizza
    'https://media.tenor.com/83p_H5nllJQAAAAC/ratatouille-disney.gif', // Remy from Ratatouille
    'https://media.tenor.com/1B3R8Q3E2dkAAAAC/cat-cooking.gif', // Cat kneading dough
    'https://media.tenor.com/XoDb03M6hGgAAAAC/stitch-lilo-and-stitch.gif', // Stitch baking
    'https://media.tenor.com/r0-lI9Tf-wgAAAAC/spongebob-spongebob-squarepants.gif', // Spongebob flipping patties
    'https://media.tenor.com/z2jBC8y31cEAAAAC/pusheen-cat.gif', // Pusheen baking
    'https://media.tenor.com/NnKi58Fp1MAAAAAC/cooking-fever.gif', // Dog flipping a pancake
    'https://media.tenor.com/k2yKLsPDf6gAAAAC/looney-tunes-bugs-bunny.gif', // Bugs Bunny stirring
    'https://media.tenor.com/J8nSX6GNu8IAAAAC/bear-bake.gif', // Grizzly from We Bare Bears
    'https://media.tenor.com/O6UTk17B2vYAAAAC/cat-chef.gif', // White cat stirring a pot
    'https://media.tenor.com/2HkH6j5_wh0AAAAC/bunny-eating.gif', // Rabbit making salad
  ]

  // The JSX that defines the structure and appearance of the component.
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200 hover:shadow-xl transition-shadow duration-200">
      {/* This is the top section of the card with the title and delete button. */}
      <div className="flex items-center justify-between mb-4">
        {/* Displays the recipe name. */}
        <h3 className="text-xl font-bold text-slate-700 flex-1">{recipe.name}</h3>
        {/* The delete button. */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-500 disabled:text-slate-300 font-bold text-lg"
          title="Delete recipe"
        >
          {/* Shows a spinner icon while deleting, otherwise a trash can. */}
          {isDeleting ? '🔄' : '🗑️'}
        </button>
      </div>

      {/* Displays the formatted creation date. */}
      <div className="text-sm text-slate-500 mb-4">
        Added on {formatDate(recipe.created_at)}
      </div>

      {/* Displays the ingredients list. */}
      <div className="mb-4">
        <h4 className="font-semibold text-slate-600 mb-2">🥕 Ingredients:</h4>
        <p className="text-slate-600 text-sm whitespace-pre-line">
          {/* Shows a preview of ingredients, or the full list if expanded. */}
          {expanded ? recipe.ingredients : recipe.ingredients.slice(0, 100) + (recipe.ingredients.length > 100 ? '...' : '')}
        </p>
      </div>

      {/* Displays the instructions list. */}
      <div className="mb-4">
        <h4 className="font-semibold text-slate-600 mb-2">📝 Instructions:</h4>
        <p className="text-slate-600 text-sm whitespace-pre-line">
          {/* Shows a preview of instructions, or the full list if expanded. */}
          {expanded ? recipe.instructions : recipe.instructions.slice(0, 150) + (recipe.instructions.length > 150 ? '...' : '')}
        </p>
      </div>

      {/* This button to expand/collapse details only appears if the text is long. */}
      {(recipe.ingredients.length > 100 || recipe.instructions.length > 150) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 hover:text-blue-500 font-semibold text-sm"
        >
          {/* The button text changes based on the 'expanded' state. */}
          {expanded ? '🔼 Show Less' : '🔽 Show More'}
        </button>
      )}

      {/* This section displays a cute GIF at the bottom of the card. */}
      <div className="mt-4 text-center">
        <img
          // Selects a GIF from the array using the recipe ID to ensure variety.
          src={cookingAnimalGifs[recipe.id % cookingAnimalGifs.length]}
          alt="Cute cartoon cooking animal"
          className="w-12 h-12 rounded-full mx-auto opacity-80"
        />
      </div>
    </div>
  )
}