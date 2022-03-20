import React from 'react'
import Jumbotron from '../components/products/Jumbotron'
import ProductsNewArrivals from '../components/home/ProductsNewArrivals'
import BestSellers from '../components/home/BestSellers'



const Home = () => {

    return (
        <>
            {/* <div>{JSON.stringify(products)}</div>
            {products.length} */}

            <div className="jumbotron bg-light text-danger h1 font-weight-bold text-center" >
                {/* Pass the array of Text */}
                <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
            </div>
            <div className="jumbotron bg-light text-center display-4 p-3 mt-5 mb-5">
                New Arrivals
            </div>
            <ProductsNewArrivals />
            <div className="jumbotron bg-light text-center display-4 p-3 mt-5 mb-5">
                Best Sellers
            </div>
            <BestSellers />
        </>
    )
}

export default Home