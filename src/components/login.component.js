import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      this.setState({ email: rememberedEmail, rememberMe: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, rememberMe } = this.state;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data)
          alert("Login successful");

          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          window.localStorage.setItem("userData", JSON.stringify(data.data?.userData));
          window.localStorage.setItem("token", data.data?.token);
          window.localStorage.setItem("userId", data.data?.userData._id);
          window.location.href = "/userDetails";
        } else {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred while logging in.");
      });
  }

  handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  }

  render() {
    const { email, password, rememberMe } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            autoComplete="username"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              name="rememberMe"
              checked={rememberMe}
              onChange={this.handleInputChange}
            />
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p className="text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    );
  }
}
