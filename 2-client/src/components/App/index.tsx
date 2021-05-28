import { useState } from 'react'
import './App.css'
import { Body } from '../Body';
import { Search } from '../Search';

const App = () => {
  const [albums, setAlbums] = useState([])
  const [artist, setArtist] = useState({})

  return (
    <div className="App">
      <h1>iTunes search</h1>
      <Search setAlbums={setAlbums} setArtist={setArtist} />
      <Body albums={albums} artist={artist} />
    </div>
  );
}

export default App;
