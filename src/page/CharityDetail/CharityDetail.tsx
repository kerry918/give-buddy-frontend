import React from "react"
import { useParams } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";

const CharityDetail = (props: any) => {
  let { id } = useParams();

  return (
    <div>
      <NavBar/>
      <h1 style={{paddingTop: 300}}>charity {id}</h1>
    </div>
  )
}

export default CharityDetail