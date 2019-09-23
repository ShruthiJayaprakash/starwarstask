import React, { Component } from "react";
import ReactDOM from "react-dom";
import Logo from "./components/Logo";
import ButtonClick from "./components/ButtonClick";
import QuerySection from "./components/QuerySection";

import "./styles.css";

class App extends Component {
  state = {
    data: {},
    isShow: false
  };
  handleResponse = (isShow, data) => {
    // console.log("isShow" + isShow);
    // console.log("data" + JSON.stringify(data));
    this.setState({ isShow, data });
  };

  render() {
    const { isShow, data } = this.state;
    return (
      <div className="container-main">
        <div className="container-wrapper">
          <Logo />
          <ButtonClick getResponse={this.handleResponse} />
          {isShow && <QuerySection isShow data={data} />}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
