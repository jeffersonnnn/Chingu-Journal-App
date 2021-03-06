import React from "react";
import { withAppContext } from "../AppContext";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearInputs = () => {
    this.setState({
      username: "",
      password: "",
      errorMessage: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .login(this.state)
      .then(() => {
        this.clearInputs();
        this.props.history.push("/notes");
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="content-wrapper">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar className="vpnStyle">
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              Sign In
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={this.handleChange}
                value={this.state.username}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
            <Typography color="error" variant="body1">
              {this.state.errorMessage}
            </Typography>
          </div>
        </Container>
      </div>
    );
  }
}

export default withAppContext(Login);
