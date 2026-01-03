import React from 'react'
import Icon from '@/components/atoms/Icon'
type circleNumberProps={
  number:string
}
const CircleNumber = ({number}:circleNumberProps) => {
  return (
    <div className='w-10 h-10 rounded-full border-2 flex justify-center items-center border-black'>
      <p>{number}</p>
      {/* <Icon>
        <svg></svg>
      </Icon> */}
    </div>
  )
}

export default CircleNumber