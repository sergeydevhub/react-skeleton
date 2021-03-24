import React from "react";
import { Paper, Typography } from "@material-ui/core";

type Props = {};
type State = {};

class MainPage extends React.PureComponent<Props, State> {
  render() {
    return (
      <Paper>
        <Typography variant="h1" align="center">
          {/* Main content */}
        </Typography>
      </Paper>
    )
  }
}

export default MainPage;
