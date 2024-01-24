import React from 'react';
import "./StepFour.css";
import { useGiveBuddyStore } from '../../store/store';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import availableProvince from '../../constants/province';

const StepFour = () => {
  const choices = ["Within Canada", "Within my province", "Doesn’t matter to me"]
  const [showProvince, setShowProvince] = React.useState(false)

  const [location, province, updateLocation, updateProvince] = useGiveBuddyStore(
    (state) => [state.location, state.province, state.updateLocation, state.updateProvince]
  )

  const handleClick = (choice: string) => {
    if (choice === "Within my province") {
      setShowProvince(true)
    } 
    else {
      setShowProvince(false)
    }
    updateLocation(choice)
  }

  const onProvinceInputChange = (event: SelectChangeEvent) => {
    updateProvince(event.target.value)
  }

  // React.useEffect(() => {
  //   console.log(location)
  //   console.log(province)
  //   console.log(city)
  // }, [location, province, city])

  return (
    <div id="onboarding-step-four">
      {choices.map((choice) => {
        return (
          <>
            <div 
              id="onboarding-step-four-button" 
              onClick={() => handleClick(choice)}
              style={{backgroundColor: location === choice ? "#F2F2F2": "white", border: location === choice ? "3px solid #BEBEBE" : "1px solid #BEBEBE"}}
            >
              <p id="onboarding-step-four-button-text">{choice}</p>
            </div>
            {(choice === "Within my province" && showProvince === true) && (
              <span style={{marginBottom: "20px"}}>
                <p id="onboarding-step-four-subtext">Select Province</p>
                {/* <input id="onboarding-step-four-input" onInput={onProvinceInputChange}/> */}
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="onboarding-step-four-select"
                    value={province}
                    onChange={onProvinceInputChange}
                  >
                    {availableProvince.map((p) => {
                      return (
                        <MenuItem value={p.short} style={{height: "40px"}}>{p.long}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </span>
            )}
          </>
        )
      })}
    </div>
  )
}

export default StepFour