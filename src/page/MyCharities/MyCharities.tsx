import React from "react"

import "./MyCharities.css"
import NavBar from "../NavBar/NavBar"

const MyCharities = () => {
  return (
    <div id="mc-page">
      <NavBar/>
      <div id="mc-text-container">
        <h1 id="mc-header">My Charities</h1>
        <p id="mc-description">List of charities that you have saved and donated</p>
      </div>
    </div>
  )
}

export default MyCharities