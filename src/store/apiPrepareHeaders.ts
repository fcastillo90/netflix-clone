import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'

const prepareHeaders = (headers: Headers): MaybePromise<Headers> => {
  const token = process.env.VITE_ACCESS_TOKEN

  // If we have a token set in state, let's assume that we should be passing it.
  if (token) {
    headers.set('authorization', `Bearer ${token}`)
  }

  return headers
}

export default prepareHeaders