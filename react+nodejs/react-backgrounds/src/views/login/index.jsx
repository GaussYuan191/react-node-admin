import React, { Component } from "react";
import { removeToken } from "@/utils/session";
import LoginView from "@/components/logins/loginView";
import RegisterView from "@/components/logins/registerView";
import Axios from "axios";
import "@/styles/basic.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "login", //**登录/注册面板 */
      ip: "",
      adress: "",
    };
  }

  componentDidMount() {
    removeToken();
    this.getUserIp();
  }
  getUserIp = () => {
    Axios.get("/cityjson?ie=utf-8").then((res) => {
      const { data } = res;
      const dataStr = data.split("=")[1].replace(/;/g, "");
      const adressObj = JSON.parse(dataStr);
      console.log("data", dataStr, adressObj);

      this.setState(
        {
          ip: adressObj.cip,
          adress: adressObj.cname,
        },
        () => {
          console.log(this.state, "state");
        }
      );
    });
  };
  showViews = (show) => {
    this.setState({
      show,
    });
  };

  render() {
    return (
      <div className="page_login">
        <div className="container">
          <LoginView
            showViews={this.showViews}
            showStatus={this.state.show}
            ip={this.state.ip}
            adress={this.state.adress}
            className={
              this.state.show === "login" ? "box showBox" : "box hiddenBox"
            }
          />

          <RegisterView
            showViews={this.showViews}
            ip={this.state.ip}
            adress={this.state.adress}
            className={
              this.state.show === "register" ? "box showBox" : "box hiddenBox"
            }
          />
        </div>
      </div>
    );
  }
}

export default Login;
