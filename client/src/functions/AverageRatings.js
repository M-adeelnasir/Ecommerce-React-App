import React from "react";
import StarRatings from 'react-star-ratings';



export const showAverage = (pro) => {


    if (pro && pro.ratings) {
        let rattingsArray = pro && pro.ratings;
        let arr = [];
        let RatingLength = rattingsArray.length; // tells the total length of a product ratings
        // console.log("length of product Rating", RatingLength);

        //map to each reating to get the stars
        rattingsArray.map((r) => arr.push(r.star));

        //will add all stars in a product rating
        let totalReduced = arr.reduce((prevValue, nextValue) => prevValue + nextValue, 0)
        // console.log("Total Stars reduced", totalReduced);

        let highest = RatingLength * 5   //total length of product rating * 5 (stars as we are using 5 stars)
        // console.log("Highest", highest);

        let result = (totalReduced * 5) / highest;
        // console.log("Result", result);


        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRatings starDimension="20px" starSpacing="2px" starRatedColor="red" editing={false} rating={result} />
                    {"  "}
                    <span className="mt-4">
                        ({pro.ratings.length})
                    </span>
                </span>
            </div>
        )


    }
}