import Grid from '../Grid'

const Body = ({ albums, artist }: { albums: any[], artist: any }) => {
  return (
    <div>
      <h2>{artist.artistName}</h2>
      <Grid albums={albums} />
    </div>
  );
}

export { Body }
