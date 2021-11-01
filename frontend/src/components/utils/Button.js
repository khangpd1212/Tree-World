import React from 'react'

export default function ButtonHome(props) {
   return (
      <button type="submit" className="btn-home">
         {props.title}
      </button>
   )
}
