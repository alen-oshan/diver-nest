import React from 'react'
import Image from 'next/image'

const SVGComp = (props) => {
  return (
    <Image
        src={props.src}
        alt={`${props.src} image`}
        width={props.size}
        height={props.size}
    />
  )
}

export default SVGComp