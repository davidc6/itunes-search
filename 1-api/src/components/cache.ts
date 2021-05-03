import NodeCache from "node-cache"

const createCache = () => {
  return new NodeCache( { stdTTL: 100, checkperiod: 120 } )
}

export default { createCache }
