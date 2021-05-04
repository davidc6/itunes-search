# Client

Client is built using `create-react-app`

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# iTunes search API and client

## API

To build and start the API - `cd` into `1-api` and run these commands `npm run build && npm start`

Use the following url to view the app:

- `http://localhost:3000/`

### Future improvements to Client

- Add react query library for fetching and caching data
- Add more unit (fine-grained) tests (individual components testing) apart from the currently existing integration tests
- Improve state passing
- Split into smaller components
- Use Sass to make use of variables and functions
- Make mobile friendly
- Make more accessible
- Add spinner / loader to give visual feedback to users when loading content
- Be more strict / add types to responses
