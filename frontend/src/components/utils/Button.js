import React from 'react'

export function BtnOutlineGray(props){
   return (
      <button type="submit" className="btn-outline btn__payment btn--gray">
         {props.title}
      </button>
   )
}

export function BtnOutlineBlue(props) {
   return (
      <button type="submit" className="btn-outline btn__payment btn--blue" >
         {props.title}
      </button>
   )
}

export default function ButtonHome(props) {
   return (
      <button type="submit" className="btn-home">
         {props.title}
      </button>
   )
}
