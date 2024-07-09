import React, { Component } from 'react';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      dob: "", // Added state for Date of Birth
      error: null // To store fetch errors
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, dob } = this.state;

    // Validate first name, last name, email, password, and date of birth
    if (!fname || !lname || !email || !password || !dob) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit registration form
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
          dob
        }),
      });

      const data = await response.json();

      // Check if registration was successful
      if (response.ok) {
        // Registration successful, redirect to sign-in page
        alert("Registration successful");
        window.location.href = "/sign-in";
      } else {
        // Registration failed, display error message
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => this.setState({ fname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              autoComplete="username"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter date of birth"
              onChange={(e) => this.setState({ dob: e.target.value })}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
}
