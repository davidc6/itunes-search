import { Application, Response, Request, NextFunction } from "express"
import qs from "qs"
import { Artist, Collection } from "./types"
import { cache } from "./components/cache";
import entities from "./components/entities"
import httpClient from "./components/httpClient"

const mountRoutes = (app: Application): void => {
  app.get("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = httpClient.createAxiosClient(cache)

      const queryString = qs.stringify(req.query)

      const artist: Artist = await entities.getFirstArtist(queryString, client)            
      const albums: Collection[] = await entities.getAlbumsByArtistId(artist.artistId, client)

      return res.status(200).json({
        status: 200,
        data: {
          items: albums,
          totalCount: albums.length
        }
      })
    } catch (err) {
      return next(err)
    }
  })
}

export { mountRoutes }
