import { Typography, Grid } from "@mui/material"

const NoMatch = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100vh'
      }}
    >
      <Typography>Uh! Oh! Nothing found</Typography>
    </Grid>
  )
}

export default NoMatch