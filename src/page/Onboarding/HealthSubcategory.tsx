import React from 'react';
import "./HealthSubcategory.css"
import healthSubcategories from '../../constants/healthSubcategories';

import { useGiveBuddyStore } from '../../store/store';

const HealthSubcategory = (props: any) => {
  const [subcategory_list, updateSubcategory] = useGiveBuddyStore(
    (state) => [state.subcategory_list, state.updateSubcategory]
  )

  const onClickCard = (sub: string) => {
    if(!subcategory_list.includes(sub)){
      const newSubcategoryList = [...subcategory_list, sub]
      updateSubcategory(newSubcategoryList)
    } 
    else {
      const newSubcategoryList = subcategory_list.filter((s) => s !== sub)
      updateSubcategory(newSubcategoryList)
    }
  }

  React.useEffect(() => {
    console.log(subcategory_list)
  }, [subcategory_list])

  return (
    <div id="health-subcategory">
      {healthSubcategories.map((c) => {
        return (
          <div 
            id="health-subcategory-card-container" 
            style={{backgroundColor: subcategory_list.includes(c) ? "#254139": "white"}}
            onClick={() => onClickCard(c)}
          >
            <h1 
              style={{color: subcategory_list.includes(c) ? "white" : "#4E4E4E"}}
              id="health-subcategory-card-name"
            >
              {c}
            </h1>
          </div>
        )
      })}
    </div>
  )
}

export default HealthSubcategory