export const getImgUrl = (path: string, size: string) => {
  return `${process.env.VITE_THEMOVIEDB_IMAGE_URL}/${size}${path}`;
}