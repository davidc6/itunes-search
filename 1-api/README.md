# iTunes search API

To build and start the API - `cd` into `1-api` and run these commands `npm run build && npm start`

To access - [http://localhost:8080](http://localhost:8080)

To run tests - `yarn test` or `npm run test`

Use the following endpoint to query the API:

- `GET /search?term=<artist_name>` (e.g. `/search?term=michael+jackson`) - returns a list of albums

### Future improvement suggestions

#### General

- Serve artist and albums information in separate response blocks e.g. `{ data: { artists: { id: 1 }, items: [{ albumId: 1 }] } }`
- Make response "less nested" e.g. `{ status: 200, items: [], total: 12 }`
- Pagination / limit to lower the response size
- Look into converting `any` / `unknown` types to more structured types / contracts
- Move routes logic into controllers to avoid bloating routes file 
- Add nodemon
- Add prettier
- Add code coverage tool (e.g. Istanbul, nyc)

#### Testing

- Extract test fixtures into separate files
- Improve code coverage by adding more unit and integration tests

#### Security

- Security (e.g. checking query string)
- Add Nginx (or any other technology) in front as a reverse proxy to provide an additional level of abstraction to improve security and add load balancing functionality
- Protecting the API (api keys, tokens etc)
- Rate limiting to harden the application

#### Monitoring / error handling

- Logging - introduce an ELK stack (Elastic, Logstash, Kibana) or a similar solution to monitor the application
- Better error handling (create a custom error handler class that extends `Error` class)

#### Deployment

- Scale Node.js application by utilising all cores on a machine / clustering
- Env specific configuration (local, test, prod)
- Dockerize for deployment and local development

#### Caching

- Optimise hashing to use shorter cache keys to use less space
- Redis / Memcached for caching
