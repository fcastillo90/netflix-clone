// jest.useFakeTimers()
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { store } from '@/store';
import * as moviePopular from '@/mocks/moviePopular.json'
import { CategoryType } from '@/types'
import Billboard from './index'

const {id, title, backdrop_path, overview } = moviePopular.results[0]

test('Display Gradient', async () => {
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
})