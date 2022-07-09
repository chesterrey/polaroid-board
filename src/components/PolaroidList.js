import React from 'react'
import PolaroidListItem from './PolaroidListItem'
import polaroidListData from '../data'
const PolaroidList = () => {
  return (
    <>
        {
          polaroidListData.map((polaroidData, index)=>{
            return(
              <PolaroidListItem key={polaroidData.id} polaroidData={polaroidData} index={index}/>
            )
          })
        }
    </>
  )
}

export default PolaroidList
