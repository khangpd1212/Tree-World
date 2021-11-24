import React from 'react'

export function BtnOutlineGray(props) {
   return (
      <button 
      type="submit" 
      className="btn btn-outline outline-gray" 
      onClick={
         () => props.handleOnClick(props)
      }>
         {props.title}
      </button>
   )
}

export function BtnOutlineBlue(props) {
   return (
      <button 
      type="submit" 
      className="btn btn-outline outline-blue" 
      onClick={
         () => props.handleOnClick(props)
      }>
         {props.title}
      </button>
   )
}

export default function ButtonHome(props) {

   return (
      <button 
      type="submit" 
      className="btn btn-home"
      onClick={
         () => props.handleOnClick(props)
      }>
         {props.title}
      </button>
   )
}