import sinon from "sinon"
import { expect } from "chai"
import entities from "../../src/components/entities"

describe("entities", () => {
  describe('getFirstArtist()', () => {
    it("should return first item in results array", async () => {        
      const getFake = sinon.fake.resolves({ data: { results: [{ data: 'test-one' }, { data: 'test-two'}] }})
      
      const httpClient = {
        get: getFake
      }
      const data = await entities.getFirstArtist('term=hello', httpClient)
      
      expect(getFake.calledOnce).to.be.true
      expect(getFake.firstCall.firstArg).to.equal('https://itunes.apple.com/search?media=music&entity=musicArtist&limit=1&term=hello')
      expect(data).to.deep.equal({ data: 'test-one' })
    })
      
    it("should return a custom object if results property is not an array", async () => {        
      const getFake = sinon.fake.resolves({ data: { resultsTwo: 'test' }})
      
      const httpClient = {
        get: getFake
      }
      const data = await entities.getFirstArtist('term=hello', httpClient)
      
      expect(getFake.calledOnce).to.be.true
      expect(getFake.firstCall.firstArg).to.equal('https://itunes.apple.com/search?media=music&entity=musicArtist&limit=1&term=hello')
      expect(data).to.deep.equal({ artistId: '' })
    })
  })
  
  describe("getAlbumsByArtistId", () => {    
    it("should return an array of albums", async () => {     
      const collectionsFixture = [ { collectionName: 'collection-one' }, { collectionName: 'collection-two' } ]
  
      const getFake = sinon.fake.resolves({ data: { results: collectionsFixture } })
      const httpClient = {
        get: getFake
      }
  
      const data = await entities.getAlbumsByArtistId('12345', httpClient)
  
      expect(getFake.calledOnce).to.be.true
      expect(getFake.firstCall.firstArg).to.equal('https://itunes.apple.com/lookup?entity=album&id=12345')
      expect(data).to.deep.equal(collectionsFixture)
    })
    
    it("should dedup albums", async () => {     
      const collectionsFixture = [ { collectionName: 'collection-one' }, { collectionName: 'collection-one' } ]
  
      const getFake = sinon.fake.resolves({ data: { results: collectionsFixture } })
      const httpClient = {
        get: getFake
      }
  
      const data = await entities.getAlbumsByArtistId('12345', httpClient)
  
      expect(getFake.calledOnce).to.be.true
      expect(getFake.firstCall.firstArg).to.equal('https://itunes.apple.com/lookup?entity=album&id=12345')
      expect(data).to.deep.equal([ collectionsFixture[0] ])
    })
    
    it("should return an empty array if results property is not an array", async () => {     
      const collectionsFixture = [ { collectionName: 'collection-one' }, { collectionName: 'collection-two' } ]
  
      const getFake = sinon.fake.resolves({ data: collectionsFixture })
      const httpClient = {
        get: getFake
      }
  
      const data = await entities.getAlbumsByArtistId('12345', httpClient)
  
      expect(getFake.calledOnce).to.be.true
      expect(getFake.firstCall.firstArg).to.equal('https://itunes.apple.com/lookup?entity=album&id=12345')
      expect(data).to.deep.equal([])
    })
  })
})
