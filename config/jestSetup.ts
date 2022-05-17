import "@testing-library/jest-dom"
import {server} from './server'

beforeAll(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
  server.listen()
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())