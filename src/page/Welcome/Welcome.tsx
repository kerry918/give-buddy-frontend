import React from "react"
import "./Welcome.css"
import { useNavigate } from "react-router-dom";
import welcomeLogo from "../../assets/welcomeLogo.png"

const Welcome = () => {
  const [curStep, setCurStep] = React.useState(1)
  const navigate = useNavigate();

  const description = () => {
    switch(curStep) {
      case 1:   return <img src={welcomeLogo}/>;
      case 2:   return <img src={welcomeLogo}/>;
      case 3:   return <p style={{color: "#FFF", fontSize: "32px", fontWeight: "400"}}>Some things to know about our charities...</p>;
      case 4:   return <p>Step 4</p>;
      case 5:   return <p>Step 5</p>;
      case 6:   return <p>Step 6</p>;
      default:  return null
    }
  }

  const step = () => {
    switch(curStep) {
      case 1:   return(
        <div>
          <h1 style={{color: "#4E4E4E", fontSize: "32px", fontWeight: "510"}}>Welcome to GiveBuddy! </h1>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>Navigating the vast array of charities out there can be overwhelming.</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>We’re here to simplify that process by asking you a few personalized questions to connect you with <span style={{fontWeight: "bold"}}>Canadian charities</span> that align with your values.</p>
        </div>
      );
      case 2:   return(
        <div style={{paddingRight: "20%"}}>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>Please note that <span style={{fontWeight: "bold"}}>skipping questions</span> may affect the precision of your result.</p>
        </div>
      );
      case 3:   return <h1>Step 3</h1>;
      case 4:   return <h1>Step 4</h1>;
      case 5:   return <h1>Step 5</h1>;
      case 6:   return <h1>Step 6</h1>;
      default:      return <h1>No project match</h1>
    }
  }

  const handleNextClick = () => {
    // change the condition to the last step, which will direct to the onboarding stuff
    if (curStep === 6){
      navigate("/onboarding");
    }
    const newStep = curStep + 1
    setCurStep(newStep)
  }

  const handleBackClick = () => {
    const newStep = curStep - 1
    setCurStep(newStep)
  }

  return (
    <>
      <div id="welcome-page">
        <div id="welcome-page-left">
          {description()}

          <div id="welcome-page-left-link-container">
            <div id="welcome-page-left-link-group">
              {curStep > 1 && (
                <a onClick={handleBackClick}><p id="welcome-page-left-link">Back</p></a>
              )}
            </div>
          </div>
        </div>

        <div id="welcome-page-right">
          {step()}
        </div>
      </div>

      <a onClick={handleNextClick}><p id="welcome-page-next-link">Next</p></a>
    </>
  )
}

export default Welcome