import React from 'react'
import StarRatings from 'react-star-ratings'
const Stars = ({ starClick, numberOfStars }) => {
  return (
    <>
      <StarRatings
        numberOfStars={numberOfStars}
        changeRating={() => starClick(numberOfStars)}
        starDimension="20px"
        starSpacing="3px"
        starHoverColor='red'
        starEmptyColor='red'

      />
      <br />
    </>
  )
}

export default Stars