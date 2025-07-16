// src/app/components/SearchBar.tsx
'use client'

// This defines the properties that the SearchBar component will accept.
interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Changed the focus ring color to pastel blue.
          className="w-full p-3 pr-10 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
        {/* This button clears the search term. */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            ✖️
          </button>
        )}
      </div>
    </div>
  )
}