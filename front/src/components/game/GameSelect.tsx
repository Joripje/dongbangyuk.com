import { Button, Grid } from "@mui/material";

function GameSelect() {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Button>가위 바위 보</Button>
      </Grid>
      <Grid item xs={4}>
        <Button>길 찾기</Button>
      </Grid>
    </Grid>
  );
}

export default GameSelect;
