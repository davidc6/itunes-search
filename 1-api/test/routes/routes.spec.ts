import { expect } from "chai"
import nock from "nock"
import sinon from "sinon"
import supertest from "supertest"
import { cache } from "../../src/components/cache"

import app from "../../src/index"

const artistsFixture = [
  { artistId: 32940 }, { artistId: 12345 }
]

const albumsFixture = {
  results: [
    {
      "wrapperType": "artist",
      "artistType": "Artist",
      "artistName": "Michael Jackson",
      "artistLinkUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
      "artistId": 32940,
      "amgArtistId": 4576,
      "primaryGenreName": "Pop",
      "primaryGenreId": 14
    },
    {
      "wrapperType": "collection",
      "collectionType": "Album",
      "artistId": 32940,
      "collectionId": 159292399,
      "amgArtistId": 4576,
      "artistName": "Michael Jackson",
      "collectionName": "The Essential Michael Jackson",
      "collectionCensoredName": "The Essential Michael Jackson",
      "artistViewUrl": "https://music.apple.com/us/artist/michael-jackson/32940?uo=4",
      "collectionViewUrl": "https://music.apple.com/us/album/the-essential-michael-jackson/159292399?uo=4",
      "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ba/f3/15/baf315d1-9c3f-03e7-6deb-4e80be0dd66c/source/60x60bb.jpg",
      "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ba/f3/15/baf315d1-9c3f-03e7-6deb-4e80be0dd66c/source/100x100bb.jpg",
      "collectionPrice": 16.99,
      "collectionExplicitness": "notExplicit",
      "trackCount": 38,
      "copyright": "℗ 1972 Motown Records, a Division of UMG Recordings, Inc., 1976, 1978, 1980 Sony Music Entertainment, 1979, 1982, 1987, 1991, 1995, 2001, 2005 MJJ Productions Inc.",
      "country": "USA",
      "currency": "USD",
      "releaseDate": "2005-07-05T07:00:00Z",
      "primaryGenreName": "Pop"
    }
  ]
}

const sandbox = sinon.createSandbox()

describe("routes", () => {
  before(() => {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  })
  
  beforeEach(() => {
    sandbox.stub(cache, 'get').returns(undefined)
    sandbox.stub(cache, 'set').returns(true)
  })
  
  after(() => {
    nock.enableNetConnect();
    nock.cleanAll();
  })

  afterEach(() => [
    sandbox.restore()
  ])

  describe("GET /search?term=michael+jackson", () => {
    it("should respond with 200 with valid body", async () => {
      nock('https://itunes.apple.com').get('/search?media=music&entity=musicArtist&limit=1&term=michael%20jackson')
        .reply(200, { results: artistsFixture })
      nock('https://itunes.apple.com').get('/lookup?entity=album&id=32940')
        .reply(200, albumsFixture)

      const res = await supertest(app)
        .get('/search?term=michael+jackson')            

        expect(res.body.status).to.equal(200)

        expect(res.body.data).to.exist
        expect(res.body.data.items).to.exist
        expect(res.body.data.totalCount).to.equal(2)
    })
    
    it("should respond with 404 and valid body if both endpoints fail", async () => {
      nock('https://itunes.apple.com').get('/search?media=music&entity=musicArtist&limit=1&term=michael%20jackson')
        .reply(404)
      nock('https://itunes.apple.com').get('/lookup?entity=album&id=32940')
        .reply(404)
        
      const res = await supertest(app).get('/search?term=michael+jackson')            
      expect(res.body.status).to.equal(404)
      expect(res.body.message).to.equal('Sorry, something went wrong')
    })
    
    it("should respond with 404 and valid body if second endpoint fails", async () => {
      nock('https://itunes.apple.com').get('/search?media=music&entity=musicArtist&limit=1&term=michael%20jackson')
        .reply(200, { results: artistsFixture })
      nock('https://itunes.apple.com').get('/lookup?entity=album&id=32940')
        .reply(404)

      const res = await supertest(app).get('/search?term=michael+jackson')            
      expect(res.body.status).to.equal(404)
      expect(res.body.message).to.equal('Sorry, something went wrong')
    })
    
    it("should respond with 404 and valid body if empty response from the the first endpoint", async () => {
      nock('https://itunes.apple.com').get('/search?media=music&entity=musicArtist&limit=1&term=michael%20jackson')
        .reply(200, {})
      nock('https://itunes.apple.com').get('/lookup?entity=album&id=32940')
        .reply(200, {})

      const res = await supertest(app).get('/search?term=michael+jackson')            
      
      expect(res.body.status).to.equal(200)
      expect(res.body.data).to.deep.equal({ items: [], totalCount: 0 })
    })
  })
})
