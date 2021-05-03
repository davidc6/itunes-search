import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App';

test('renders input field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Enter artist name');
  
  expect(inputElement).toBeInTheDocument();
});

test('renders input field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Enter artist name');
  
  expect(inputElement).toBeInTheDocument();
});

const server = setupServer(
  rest.get('http://localhost:8080/search?term=michael+jackson', (req, res, ctx) => {
    return res(ctx.json({ 
      data: { 
        items: [ 
          { artistName: 'Test' },
          { collectionName: 'One', artworkUrl100: 'link-one' },
          { collectionName: 'Two', artworkUrl100: 'link-two' } 
        ] 
      }
    }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders data received from server', async () => {
  const utils = render(<App />)
  const input = utils.getByLabelText('search-input');
  
  fireEvent.change(input, { target: { value: 'michael jackson' } })
  
  await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument(), { timeout: 1000 })
  await waitFor(() => expect(screen.getByText('One')).toBeInTheDocument(), { timeout: 1000 })
  await waitFor(() => expect(screen.getByText('Two')).toBeInTheDocument(), { timeout: 1000 })  
})
