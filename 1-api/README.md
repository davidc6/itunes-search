# iTunes search API

To build and start the API - `cd` into `1-api` and run these commands `npm run build && npm start`

To access - [http://localhost:8080](http://localhost:8080)

To run tests - `yarn test` or `npm run test`

Use the following endpoint to query the API:

- `GET /search?term=<artist_name>` (e.g. `/search?term=michael+jackson`) - returns a list of albums

### Future improvements to API

- Add nodemon
- Rate limiting
- Pagination / limit
- Server artist data and albums data in separate response blocks e.g. `{ data: { artists: { id: 1 }, items: [{ albumId: 1 }] } }`
- Make response "less nested" e.g. `{ status: 200, items: [], total: 12 }`
- Move test fixtures to a separate location
- Prettier
- Scale Node.js application by utilising all cores on a machine / clustering
- Finalise tests
- Better error handling (create a custom error handler class that extends `Error` class)
- Security (e.g. checking query string)
- Protecting the API (api keys, tokens etc)
- Logging (ELK) - elastic, logstash, kibana
- Dockerize for deployment and local development
- Env specific configuration (local, test, prod)
- Redis / Memcached for caching
- Look into converting `any` types to more structured types
- Optimise hashing to use shorter cache keys to use less space
- Add Nginx (or any other technology) in front as a reverse proxy to provide an additional level of abstraction to improve security and add load balancing functionality
- Move routes logic into controllers to avoid bloating routes file 
