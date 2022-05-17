import React from 'react'
import {render, screen} from '@testing-library/react'
import GradientBottom from './GradientBottom'

describe('GradientBottom', () => {
  it('Should display Gradient', () => {
    render(<GradientBottom />)
    expect(screen.getByTestId('gradient-bottom')).toBeTruthy()
    expect(screen.getByTestId('gradient-bottom')).toHaveProperty('style.position', 'absolute')
  })
})