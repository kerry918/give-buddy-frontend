import React from "react"

import "./FindCharities.css"
import NavBar from "../NavBar/NavBar"

const FindCharities = () => {
  return (
    <div id="fc-page">
      <NavBar/>
      <div id="fc-text-container">
        <h1 id="fc-header">Charity Directory</h1>
        <p id="fc-description">List of all the charities available in GiveBuddy</p>
      </div>
    </div>
  )
}

export default FindCharities