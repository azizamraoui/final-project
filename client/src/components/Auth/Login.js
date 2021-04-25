import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Alert } from '@material-ui/lab';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <div key={i}>{error.message}</div>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
        })

        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };
  componentDidMount() {
    document.body.className = "bg";
    return () => {
      document.body.className = "";
    };
  }
  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs" className=" login-container" id="bg">
        <CssBaseline />
        <div className="paper">
          <img src={require('../../assets/icons8-battle.net-128.png')} alt="" />
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className="form" noValidate onSubmit={this.handleSubmit} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              className={this.handleInputError(errors, "email")}
              onChange={this.handleChange}
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
              autoComplete="current-password"
              value={password}
              className={this.handleInputError(errors, "password")}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             <div className="loading-wrapper">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={loading ? "loading submit" : "submit"}
                >
                  Sign In
              </Button>
              {loading && <CircularProgress size={24} className="loading-buttonProgress" />}
            </div>
            <Grid container>
              <Grid item xs>
                <Button color="primary">Forgot?</Button>

              </Grid>
              <Grid item>
                <Link style={{ textDecoration: "none" }} color="primary" to="/register"> <Button color="primary">Create account Register</Button></Link>
              </Grid>
            </Grid>
          </form>
          {errors.length > 0 && (
            <Alert className="error-message" severity="error">{this.displayErrors(errors)}</Alert>
          )}
        </div>
      </Container>
    )
  }
}


export default Login;