import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { increment, decrement, incrementByAmount } from "../redux/counterSlice";
import "./userDetails.css";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      inputValue: "",
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          this.setState({ userData: data.data });
        } else {
          this.setState({ error: "Failed to fetch user data" });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.setState({ error: "Error fetching user data" });
      });
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/sign-in";
  };

  render() {
    const { userData, error } = this.state;
    const { counterValue, dispatch } = this.props;

    return (
      <div className="user-details-container">
        {error && <div className="error-message">{error}</div>}
        <h1>Name: {userData.fname}</h1>
        <h2>Email: {userData.email}</h2>
        <h2>Date of Birth: {userData.dob}</h2> {/* Display Date of Birth */}
        <h3>Counter: {counterValue}</h3>
        <div className="button-container">
          <button className="increment-button" onClick={() => dispatch(increment())}>
            Increment
          </button>
          <button className="decrement-button" onClick={() => dispatch(decrement())}>
            Decrement
          </button>
          <button className="increment-by-five-button" onClick={() => dispatch(incrementByAmount(5))}>
            Increment by 5
          </button>
          <button className="logout-button" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counterValue: state.counter ? state.counter.value : 0,
});

export default connect(mapStateToProps)(UserDetails);
