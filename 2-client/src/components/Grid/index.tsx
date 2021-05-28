import './style.css'

const Grid = ({ albums }: { albums: any }) => {
  return (
    <div className="grid">
      <ul className="grid-ul">
        {albums.map((result: any, index: number) =>
          <li key={index} className="grid-li">
            <img src={result.artworkUrl100} alt={result.collectionName} />
            <p>{result.collectionName}</p>
          </li>  
        )}
      </ul>
    </div>
  )
}

export default Grid
