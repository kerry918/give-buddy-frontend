import React from "react"
import "./Welcome.css"
import { useNavigate } from "react-router-dom";
import welcomeLogo from "../../assets/welcomeLogo.png"
import financialTransparency from "../../assets/financialTransparency.jpg"
import centsToCause from "../../assets/centsToCause.jpg"

const Welcome = () => {
  const [curStep, setCurStep] = React.useState(1)
  const navigate = useNavigate();

  const description = () => {
    switch(curStep) {
      case 1:   return <img src={welcomeLogo}/>;
      case 2:   return <img src={welcomeLogo}/>;
      case 3:   return <p style={{color: "#FFF", fontSize: "32px", fontWeight: "400"}}>Some things to know about our charities...</p>;
      case 4:   return (
        <div>
          <p style={{color: "#FFF", fontSize: "40px", fontWeight: "400", paddingBottom: "40px", margin: "0"}}>Charity Characteristics</p>
          <p style={{color: "#FFF", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>1. &nbsp; Financial Transparency</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>2. &nbsp; Cents to cause</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400"}}>3. &nbsp; Results Reporting</p>
        </div>
      );
      case 5:   return (
        <div>
          <p style={{color: "#FFF", fontSize: "40px", fontWeight: "400", paddingBottom: "40px", margin: "0"}}>Charity Characteristics</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>1. &nbsp; Financial Transparency</p>
          <p style={{color: "#FFF", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>2. &nbsp; Cents to cause</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400"}}>3. &nbsp; Results Reporting</p>
        </div>
      );
      case 6:   return (
        <div>
          <p style={{color: "#FFF", fontSize: "40px", fontWeight: "400", paddingBottom: "40px", margin: "0"}}>Charity Characteristics</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>1. &nbsp; Financial Transparency</p>
          <p style={{color: "#949494", fontSize: "32px", fontWeight: "400", paddingBottom: "40px"}}>2. &nbsp; Cents to cause</p>
          <p style={{color: "#FFF", fontSize: "32px", fontWeight: "400"}}>3. &nbsp; Results Reporting</p>
        </div>
      );
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
      case 3:   return (
        <div style={{paddingRight: "10%"}}>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400", paddingBottom: "40px"}}>Our charities are evaluated by 3 different characteristics:</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400", paddingBottom: "40px"}}>1. &nbsp; Financial Transparency</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400", paddingBottom: "40px"}}>2. &nbsp; Cents to cause</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>3. &nbsp; Results Reporting</p>
        </div>
      );
      case 4:   return (
        <div>
          <p style={{color: "#4E4E4E", fontSize: "32px", fontWeight: "500"}}>Financial Transparency</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400", paddingBottom: "30px"}}>This is evaluating how easily a charity’s audited financial statements can be accessed online.</p>
          <img src={financialTransparency} style={{width: "100%"}}/>
        </div>
      );
      case 5:   return (
        <div>
          <p style={{color: "#4E4E4E", fontSize: "32px", fontWeight: "500"}}>Cents to cause</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>This indicates how many cents per dollar donated are going towards the charity's programs.</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400", paddingBottom: "30px"}}>If Charity A has a score of 89%, it means that for every dollar donated to the charity, $0.89 will go to the charity’s programs while the rest could be allocated for operations and admin purposes.</p>
          <img src={centsToCause} style={{width: "80%"}}/>
        </div>
      );
      case 6:   return (
        <div>
          <p style={{color: "#4E4E4E", fontSize: "32px", fontWeight: "500"}}>Results Reporting</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>This grade is an evaluation of how public a charity’s reports are on their activities, outputs and outcomes. This does not consider the strength or quality of these aspects.</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>Evaluation involves 26 questions covering aspects such as strategy, activities, outcomes, and overall quality.</p>
          <p style={{color: "#4E4E4E", fontSize: "24px", fontWeight: "400"}}>Charities receive a score ranging from <span style={{fontWeight: "bold"}}>A+ to F</span> based on their disclosure practices.</p>
        </div>
      );
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