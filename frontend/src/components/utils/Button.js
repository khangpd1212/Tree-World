import React from 'react'

export function BtnOutlineGray(props){
   return (
      <button type="submit" className="btn btn-outline outline-gray">
         {props.title}
      </button>
   )
}

export function BtnOutlineBlue(props) {
   return (
      <button type="submit" className="btn btn-outline outline-blue">
         {props.title}
      </button>
   )
}

export default function ButtonHome(props) {

   return (
      <button type="submit" className="btn btn-home">
         {props.title}
      </button>
   )
}