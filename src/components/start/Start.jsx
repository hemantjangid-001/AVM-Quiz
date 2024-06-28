import React from "react";
import { useState } from "react";
import "./start.css";
import BG_IMG from "../../assets/background.svg";

export default function Start({ setUsername }) {
  // const [name, setName] = useState("");

  let user__name, f__name, l__name;

  const handleClick = () => {
    user__name = f__name + " " + l__name;
    if(user__name !== undefined + " " + undefined){
      setUsername(user__name);
    }
  };

  function handleChangeFName(event) {
    f__name = event.target.value;
  }

  function handleChangeLName(event) {
    l__name = event.target.value;
  }

  return (
    <div className="start-container">
      <img src={BG_IMG} alt="" className="start-img" />
      <form className="welcome-container">
        <h1 className="start-heading">Welcome !</h1>
        <label htmlFor="firstName">First Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="startInput"
          onChange={handleChangeFName}
          name="firstName"
        />
        <br />
        <label htmlFor="firstName">Last Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Your Name"
          className="startInput"
          onChange={handleChangeLName}
          name="lastName"
        />
        <br />
        <button className="startButton" onClick={handleClick}>
          Start
        </button>
      </form>
    </div>
  );
}
