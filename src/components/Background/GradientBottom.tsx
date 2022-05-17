import React from 'react'

const GradientBottom = () => {
  return (
    <div
      data-testid="gradient-bottom"
      style={{
        position: 'absolute',
        background: "linear-gradient(rgba(20,20,20,0) 66%, rgba(20,20,20,1) 100%)",
        width: '100%',
        height: '101%',
        zIndex: 9
      }}
    />
  )
}

export default GradientBottom