import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import debounce from "lodash.debounce";
import './Search.css';

const buildTerm = (value: string) => value.split(' ').join('+')

const Search = ({ setAlbums, setArtist }: { setAlbums: Dispatch<SetStateAction<never[]>>, setArtist: Dispatch<SetStateAction<{}>> }) => {
  const getAlbums = (artistName: string) => {    
    if (!artistName) {      
      setAlbums([])
      setArtist({})
      return
    }

    fetch(`http://localhost:8080/search?term=${buildTerm(artistName)}`)
      .then(data => data.json())
      .then(response => {
        const { data: { items } } = response
        // first item in the response provides artist data
        setArtist(items[0])
        setAlbums(items.slice(1, items.length))
      })
  }

  // debounceSave is initialised and "saved" once
  // call getAlbums() if no further calls to debounceSave() occurred in the last 1000 milliseconds
  const debounceSave = debounce(getAlbums, 1000)

  const handleSearch = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement    
    
    // debounceSave gets called on each input change
    debounceSave(value)
  }

  return (
    <div className="Search">
      <input placeholder="Enter artist name" aria-label="search-input" className="Search-input" onChange={handleSearch} />
    </div>
  )
}

export { Search }
