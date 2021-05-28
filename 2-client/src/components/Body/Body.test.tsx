import { render, screen } from '@testing-library/react'
import { Body } from './'

describe('<Body />', () => {
  const props = {
    albums: [
      {
        collectionName: 'Collection name',
        artworkUrl100: 'https://some-url.com'
      }
    ],
    artist: { artistName: 'Some artist name' }
  }

  test('renders the heading', () => {
    render(<Body {...props} />)
    
    expect(screen.getByRole('heading')).toHaveTextContent('Some artist name')
  })
  
  test('renders the grid', () => {
    const { getByAltText } = render(<Body {...props} />)
    const image = getByAltText('Collection name');
    
    expect(image).toHaveAttribute('src', 'https://some-url.com')
    expect(screen.getByText('Collection name')).toBeTruthy
  })
})
