export const getImgUrl = (path: string, size: string) => {
  return `${import.meta.env.VITE_THEMOVIEDB_IMAGE_URL}/${size}${path}`;
}