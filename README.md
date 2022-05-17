# NETFLIX CLONE

## This project is my take on the Netflix webapp using [themoviedb.org](https://www.themoviedb.org/) APIs

###  *work in progress*

It contains:

- [X] React v18
- [X] Typescript
- [X] Vite
- [X] pnpm
- [X] Redux toolkit + query
- [X] Data cache
- [X] React Portal
- [X] Lazy image fetching (IntersectionObserver)
- [X] React router
- [X] MUI
- [X] dotenv files
- [X] custom hooks
- [X] path aliases

Work pending:

- [ ] testing
- [ ] better responsive

## STEPS TO RUN

1. Clone project
2. On terminal, execute `pnpm install`
3. Register on [themoviedb.org](https://www.themoviedb.org/) webpage and create an API key
4. Create a `.env` file on the root folder containing the following:

    ```text
    VITE_ACCESS_TOKEN={{THE ACCESS TOKEN FOUND IN THE THEMOVIEDB WEBPAGE AFTER REGISTERING}}
    VITE_THEMOVIEDB_IMAGE_URL=https://image.tmdb.org/t/p
    VITE_THEMOVIEDB_API_URL=https://api.themoviedb.org/3
    ```

5. Execute `pnpm run dev`

***enjoy!***

**Author**: Francisco Castillo González
