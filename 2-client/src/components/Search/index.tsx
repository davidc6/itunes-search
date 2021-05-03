import { useState, useRef, Dispatch, SetStateAction, ChangeEvent } from 'react'
import debounce from "lodash.debounce";
import './Search.css';

const Search = ({ setAlbums, setArtist }: { setAlbums: Dispatch<SetStateAction<never[]>>, setArtist: Dispatch<SetStateAction<never[]>> }) => {
  const [searchValue, setSearchValue] = useState('')
  
  const buildTerm = (value: string) => value.split(' ').join('+')
  
  const debounceSave = useRef(debounce(nextValue => getAlbums(nextValue), 500)).current

  const handleSearch = (e: ChangeEvent) => {
    const { value: nextValue } = e.target as HTMLInputElement
    setSearchValue(nextValue)
    debounceSave(nextValue)
  }

  const getAlbums = (artistName: string) => {
    if (!artistName) return setAlbums([])
    
    fetch(`http://localhost:8080/search?term=${buildTerm(artistName)}`)
      .then(data => data.json())
      .then(response => {              
        const { data: { items } } = response;

        setAlbums(items.slice(1, items.length))
        setArtist(items[0])
      })
  }
  
  return (
    <div className="Search">
      <input placeholder="Enter artist name" aria-label="search-input" className="Search-input" onChange={handleSearch} />
    </div>
  )
}

export { Search }
