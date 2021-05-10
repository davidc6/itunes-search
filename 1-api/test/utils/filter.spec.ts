import { expect } from "chai"
import { isNotADuplicate } from "../../src/utils/filter"

describe("filter util", () => {
  it("isNotADuplicate() returns true if no duplicates found", () => {
    const result = isNotADuplicate()
    
    expect(result({ collectionName: 'collection-one' })).to.be.true
  })
  
  it("isNotADuplicate() returns false if a duplicate found", () => {
    const result = isNotADuplicate()
    
    result({ collectionName: 'collection-one' })
    expect(result({ collectionName: 'collection-one' })).to.be.false
  })
})
