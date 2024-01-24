import React from "react";
import axios from "axios";
import { API_URL } from "../../constants/url";
import { Charity, useGiveBuddyStore } from '../../store/store';

import NavBar from "../NavBar/NavBar";

import "./RecommendedCharities.css"
import { getSpecificCharities } from "../../utils/utils";

const RecommendedCharities = () => {
  const [matched_charities] = useGiveBuddyStore(
    (state) => [state.matched_charities]
  )

  const [curCharity, setCurCharity] = React.useState<Charity|undefined>(undefined)

  React.useEffect(() => {
    if (matched_charities){
      axios
        .get(`${API_URL}/charities/1/`)
        .then((res) => setCurCharity(res.data))
        .catch((err) => console.log(err));
    }
  }, [matched_charities])

  return (
    <div id="rc-page">
      <NavBar/>
      <div id="rc-text-container">
        <h1 id="rc-header">Recommended Charities</h1>
        <p id="rc-description">Here are some charities that we’ve picked out for you.</p>
        <p id="rc-description">You can visit the charity website and donate today or you can save it to donate for another time.</p>
      </div>
      {matched_charities?.map((c) => {
        return (
          <h1>{c.toString()}</h1>
        )
      })}
      {curCharity !== undefined && (
        <div>{curCharity.charity_name}</div>
      )}
    </div>
  )
}

export default RecommendedCharities