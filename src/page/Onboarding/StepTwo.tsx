import React from 'react';
import categories from '../../constants/categories';
import Button from '@mui/material/Button';
import { useGiveBuddyStore } from '../../store/store';

import "./StepTwo.css"
import PetsIcon from '@mui/icons-material/Pets';
import DrawIcon from '@mui/icons-material/Draw';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ForestIcon from '@mui/icons-material/Forest';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LanguageIcon from '@mui/icons-material/Language';
import ChurchIcon from '@mui/icons-material/Church';

const StepTwo = () => {
  const [category, updateCategory] = useGiveBuddyStore(
    (state) => [state.category, state.updateCategory]
  )

  const [selectCategory, setSelectCategory] = React.useState<string[]>(category)

  const handleClick = (category: string) => {
    if (!selectCategory.includes(category)){
      const newSelectedCategory = [...selectCategory, category]
      setSelectCategory(newSelectedCategory)
      updateCategory(newSelectedCategory)
    }
    else {
      const newSelectedCategory = selectCategory.filter((c) => c !== category)
      setSelectCategory(newSelectedCategory)
      updateCategory(newSelectedCategory)
    }
  }

  // React.useEffect(() => {
  //   console.log(category)
  // }, [category])

  const categoryIcon = (name: string) => {
    switch(name) {
      case "Animal Welfare":   return <PetsIcon/>;
      case "Arts & Culture":   return <DrawIcon/>;
      case "Education":   return <LocalLibraryIcon/>;
      case "Environment":   return <ForestIcon/>;
      case "Health":   return <MedicalInformationIcon/>;
      case "Social Services":   return <PeopleAltIcon/>;
      case "International Aid":   return <LanguageIcon/>;
      case "Religion":   return <ChurchIcon/>;
      default:  return null
    }
  }

  return (
    <div id="onboarding-step-two">
      {categories.map((category) => {
        return (
          <Button 
            variant={selectCategory.includes(category.name) ? "contained": "outlined"} 
            id="onboarding-step-two-button" 
            onClick={() => handleClick(category.name)}
            style={{color: selectCategory.includes(category.name) ? "white" : "#4E4E4E", backgroundColor: selectCategory.includes(category.name) ? "#254139": "white"}}
          >
            {categoryIcon(category.name)}
            &nbsp;
            {category.name}
          </Button>
        )
      })}
    </div>
  )
}

export default StepTwo