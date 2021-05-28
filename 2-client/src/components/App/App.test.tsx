import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './'

describe('Heading', () => {
  test('gets rendered', () => {
    render(<App />)
    const heading = screen.getByText('iTunes search')

    expect(heading).toBeInTheDocument()
  })
})

describe('Input field', () => {
  test('gets rendered', () => {
    render(<App />)
    const inputElement = screen.getByPlaceholderText('Enter artist name')
  
    expect(inputElement).toBeInTheDocument()
  })
})

describe('App', () => {
  const server = setupServer(
    rest.get('http://localhost:8080/search', (req, res, ctx) => {
      return res(ctx.json({ 
        data: { 
          items: [
            { artistName: 'Michael Jackson' },
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
    const input = utils.getByLabelText('search-input')

    fireEvent.change(input, { target: { value: 'michael jackson' } })

    await waitFor(() => expect(screen.getByText('Michael Jackson')).toBeInTheDocument(), { timeout: 1100 })
    await waitFor(() => expect(screen.getByText('One')).toBeInTheDocument(), { timeout: 1100 })
    await waitFor(() => expect(screen.getByText('Two')).toBeInTheDocument(), { timeout: 1100 })
  })
})
