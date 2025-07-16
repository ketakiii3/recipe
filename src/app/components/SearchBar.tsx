// src/app/components/SearchBar.tsx
'use client'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGV0bjBkZjVkM3B3MzFhNGVkNDZkMzFkNGVkNDZkMzFkNGVkNDZkMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgG50Fb7Mi0prBC/giphy.gif" 
          alt="Cute cooking rabbit"
          className="w-12 h-12 rounded-full mr-2"
        />
        <span className="text-lg font-semibold text-gray-700">Search Recipes</span>
      </div>
      
      <input
        type="text"
        placeholder="🔍 Search by dish name or ingredients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 text-lg border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-md"
      />
    </div>
  )
}