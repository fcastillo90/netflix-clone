import { rest } from 'msw'
import * as configuration from './configuration.json'
import * as configurationPrimarytranslations from './configurationPrimarytranslations.json'
import * as genreMovieList from './genreMovieList.json'
import * as genreTvList from './genreTvList.json'
import * as movieIdVideos from './movieIdVideos.json'
import * as moviePopular from './moviePopular.json'
import * as movieToprated from './movieToprated.json'

const id = moviePopular.results[0].id

const handlers = [
  rest.get('/configuration', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(configuration),
    )
  }),
  rest.get('/configuration/primary_translations', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(configurationPrimarytranslations),
    )
  }),
  rest.get('/genre/movie/list', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(genreMovieList),
    )
  }),
  rest.get('/movie/popular', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(moviePopular),
    )
  }),
  rest.get(`/movie/${id}`, (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
  rest.get(`/movie/${id}/videos`, (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json(movieIdVideos),
    )
  }),
  rest.get('/movie/latest', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
  rest.get('/movie/top_rated', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(movieToprated),
    )
  }),
  rest.get('/genre/tv/list', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json(genreTvList),
    )
  }),
  rest.get(`/tv/${id}`, (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
  rest.get('/tv/popular', (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
  rest.get(`/tv/${id}/videos`, (req, res, ctx) => {
    
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]
export {handlers}