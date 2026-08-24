'use client'
import React, { useState } from 'react'
import InputSearch from '@/components/atoms/InputSearch'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { FaSearch } from "react-icons/fa";


type SearchBarProps<T> = {
  items: T[];
  onSearch: (results: T[]) => void;
  placeholder?: string;
  searchKeys: (keyof T)[];
  getDisplayValue: (item: T) => string;
  getImageUrl?: (item: T) => string | null | undefined; // <- nueva prop opcional
  noResultsMessage?: string;
};

function SearchBar<T>({
  items,
  onSearch,
  placeholder = 'Buscar...',
  searchKeys,
  getDisplayValue,
  getImageUrl,
  noResultsMessage
}: SearchBarProps<T>) {

  const [busqueda, setBusqueda] = useState("")
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hasNoResults, setHasNoResults] = useState(false)
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    executeSearch(busqueda)
    setShowAutocomplete(false)
  }

  const executeSearch = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase().trim()

    if (!searchLower) {
    setHasNoResults(false)
    onSearch(items)
    return
    }

    const results = items.filter(item =>
      searchKeys.some(key => {
        const value = item[key]
        return String(value).toLowerCase().includes(searchLower)
      })
    )

    setHasNoResults(results.length === 0)
    onSearch(results)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBusqueda(value)
    setShowAutocomplete(value.length > 0)
    setActiveIndex(-1)

    executeSearch(value)
  }

  const handleSelectItem = (item: T) => {
    const displayValue = getDisplayValue(item)
    setBusqueda(displayValue)
    onSearch([item])
    setShowAutocomplete(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showAutocomplete || filteredItems.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        if (activeIndex >= 0) {
          e.preventDefault()
          handleSelectItem(filteredItems[activeIndex])
        }
        break
      case 'Escape':
        setShowAutocomplete(false)
        setActiveIndex(-1)
        break
    }
  }

  const filteredItems = busqueda.length > 0
    ? items.filter(item =>
      searchKeys.some(key =>
        String(item[key]).toLowerCase().includes(busqueda.toLowerCase())
      )
    ).slice(0, 5)
    : []

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className='flex w-full items-center px-2 rounded-3xl border-2 border-[#23C1DE] bg-transparent overflow-hidden'
        onKeyDown={handleKeyDown}
      >
        <Icon className='bg-transparent'>
          <FaSearch className='text-gray-500' />
        </Icon>

        <InputSearch
          value={busqueda}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => busqueda.length > 0 && setShowAutocomplete(true)}
          onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
          className="bg-transparent text-white placeholder:text-gray-400"
        />

        <Button type="submit" size='sm' className='font-normal tracking-wider'>
          Buscar
        </Button>
      </form>

      {/* Dropdown de autocompletado */}
      {showAutocomplete && filteredItems.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-[#141A3F] shadow-lg rounded-2xl p-2 mt-1 max-h-72 overflow-auto z-[9999]">
          {filteredItems.map((item, index) => {
            const isActive = index === activeIndex

            return (
              <li
                key={index}
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors
                  ${isActive ? 'bg-[#203565]' : 'hover:bg-[#203565]'}
                `}
              >
                {/* Nombre del producto */}
                <span className="text-sm text-white truncate">
                  {getDisplayValue(item)}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      {/* Sin resultados */}
      {hasNoResults && noResultsMessage && (
        <div className="absolute top-full left-0 w-full px-4 py-2 mt-1 text-sm text-red-500 font-medium animate-fade-in">
          {noResultsMessage}
        </div>
      )}
    </div>
  )
}

export default SearchBar
