import './Body.css';

const Body = ({ albums, artist }: { albums: any[], artist: any }) => {
  return (
    <div className="Body">
      <h2>{artist.artistName}</h2>
      <div className="Body-wrap">        
        <ul className="Body-ul">
          {albums.map((result: any, index) =>
            <li key={index} className="Body-li">
              <img src={result.artworkUrl100} alt={result.collectionName} />
              <p>{result.collectionName}</p>
            </li>  
          )}
        </ul>
      </div>
    </div>
  );
}

export { Body }
