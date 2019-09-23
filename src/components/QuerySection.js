import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { query2, query1 } from "../helpers/constants";

const styles = theme => ({
  pDefault: {
    fontWeight: 600,
    fontSize: "1.2rem"
  },
  queryColor: {
    color: "#fff"
  },
  responseColor: {
    color: "#f9fc22"
  }
});

class QuerySection extends Component {
  render() {
    const { classes, data } = this.props;
    console.log("data in query" + JSON.stringify(data));
    return (
      <React.Fragment>
        <p className={classes.queryColor}>{query1}</p>
        <p className={classes.responseColor}>{data.query1Res}</p>
        <p className={classes.queryColor}>{query2}</p>
        <p className={classes.responseColor}>{data.query2Res}</p>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(QuerySection);
