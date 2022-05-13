
  export const preventHorizontalKeyboardNavigation = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  export const getHeight16by9 = (width: number) => {
    return width * 9 / 16;
  }