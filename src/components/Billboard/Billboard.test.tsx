// jest.useFakeTimers()
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '@/store';
import * as moviePopular from '@/mocks/moviePopular.json'
import { CategoryType } from '@/types'
import Billboard from './index'

const {id, title, backdrop_path, overview } = moviePopular.results[0]

describe('Billboard', () => {
  it('should render Billboard', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Billboard 
            category={CategoryType.MOVIE}
            id={id}
            image={backdrop_path}
            overview={overview}
            title={title}
          />
        </Provider>
      </MemoryRouter>
    )
    expect(screen.queryByTestId('billboard-info-container')).toBeTruthy()
    expect(screen.queryByTestId('billboard-img-video-container')).toBeTruthy()
    expect(screen.queryByText(title)).toBeTruthy()
    expect(screen.queryByText(overview)).toBeTruthy()
    expect(screen.queryByTestId('billboard-img')).toHaveProperty('alt', title)
    expect(screen.queryByTestId('billboard-img')).toHaveProperty('src', `http://localhost/undefined/original${backdrop_path}`)
    expect(screen.queryByTestId('billboard-info-button-play')).toBeTruthy()
    expect(screen.queryByTestId('billboard-info-button-more-info')).toBeTruthy()
    await waitFor(() => {
      expect(screen.queryByTestId('billboard-video-container')).toBeTruthy()
    })
  })
  
  it('should trigger Billboard actions', async () => {

  })
})