import React from 'react'
import { Card, Skeleton } from 'antd'

const SkeletonCard = ({ count }) => {
  const cards = () => {
    let totalCards = []
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className='col m-3'>
          <Skeleton active></Skeleton>
        </Card>
      )
    }
    //return the total skeleton
    return totalCards
  }

  //resturn cards fun
  return (<div className='row pd-5'>{cards()}</div>)
}

export default SkeletonCard