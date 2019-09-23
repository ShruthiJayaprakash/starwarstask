import React, { Component } from "react";
import { Button, Icon, withStyles } from "@material-ui/core";
import axios from "axios";
import classNames from "classnames";

const styles = theme => ({
  button: {
    padding: 20,
    margin: 10,
    boxShadow: "0px 12px #C7C708, 0 0 16px #F1F1DE",
    fontSize: "1.2rem",
    fontWeight: 600,
    radius: "12px",
    textTransform: "none"
  },
  defaultColor: {
    background: "#f9fc22",
    color: "rgba(0, 0, 0)",
    "&:hover": {
      background: "#FCFC9A",
      color: "rgba(0, 0, 0)",
      boxShadow: "0px 8px #C7C708"
    }
  },
  howerColor: {
    boxShadow: "0px 8px #C7C708",
    background: "#FCFC9A",
    color: "#C7C708",
    "&:hover": {
      background: "#FCFC9A",
      color: "#C7C708"
    }
  },
  iconDefault: {
    color: "rgba(0, 0, 0)"
  },
  iconHower: {
    color: "#C7C708"
  }
});

class ButtonClick extends Component {
  state = {
    isClicked: false
  };

  handleButtonClick = () => {
    let data = {
      query1Res: "",
      query2Res: ""
    };
    if (this.state.isClicked === false) {
      axios
        .all([
          axios.get("https://swapi.co/api/films"),
          axios.get("https://swapi.co/api/people")
        ])
        .then(
          axios.spread((firstResponse, secondResponse) => {
            console.log(firstResponse.data, secondResponse.data);
            //compute max crawl
            let maxCrawl = Math.max(
              ...firstResponse.data.results.map(el => el.opening_crawl.length)
            );
            let maxCrawlTitle = firstResponse.data.results.filter(
              el => el.opening_crawl.length === maxCrawl
            );
            // console.log(
            //   "maxCrawlTitle" + JSON.stringify(maxCrawlTitle[0].title)
            // );
            data.query1Res = maxCrawlTitle[0].title;
            //compute max moviews by the person

            let maxFilms = Math.max(
              ...secondResponse.data.results.map(el => el.films.length)
            );

            let maxFilmsName = secondResponse.data.results.filter(
              el => el.films.length === maxFilms
            );
            // console.log("maxFilmsName" + JSON.stringify(maxFilmsName[0].name));
            data.query2Res = maxFilmsName[0].name;
            this.props.getResponse(true, data);
          })
        )
        .catch(error => console.log(error));
    } else {
      this.props.getResponse(false, data);
    }
    this.setState({ isClicked: !this.state.isClicked });
  };
  render() {
    const { isClicked } = this.state;
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        onClick={this.handleButtonClick}
        className={classNames(
          classes.button,
          !isClicked ? classes.defaultColor : classes.howerColor
        )}
      >
        <Icon
          className={!isClicked ? classes.iconDefault : classes.iconClicked}
        >
          star
        </Icon>
        Do. Or do not. There is no try.
        <Icon
          className={!isClicked ? classes.iconDefault : classes.iconClicked}
        >
          star
        </Icon>
      </Button>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ButtonClick);
