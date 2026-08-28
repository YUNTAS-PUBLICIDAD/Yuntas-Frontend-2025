import React from 'react'
import Icon from '@/components/atoms/Icon'
type circleNumberProps={
  number:string
}
const CircleNumber = ({number}:circleNumberProps) => {
  return (
    <div className='w-8 h-8 rounded-full border-4 flex justify-center items-center border-brand-blue flex-shrink-0'>
      <p>{number}</p>
      {/* <Icon>
        <svg></svg>
      </Icon> */}
    </div>
  )
}

export default CircleNumber