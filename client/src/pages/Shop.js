import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import { getAllProducts, getProductOnSearch } from '../functions/getAllProducts'
import { getCategories } from '../functions/category'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Slider, Checkbox } from 'antd'
const { SubMenu } = Menu;


const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)

    const [categories, setCategories] = useState([])
    const [categoriesIds, setCategoriesIds] = useState([])


    const dispatch = useDispatch()



    //load the deafult products on shop page
    const loadProduct = () => {
        setLoading(true)
        getAllProducts(6)
            .then((res) => {
                // console.log(res.data.data);
                setProducts(res.data.data)
                setLoading(false)
            })
    }

    //load all categories
    const loadCategories = () => {
        getCategories()
            .then((res) => {
                // console.log(res.data.data);
                setCategories(res.data.data)
            })
    }


    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])



    //load the products based upon text
    const fetchProducts = (arg) => {
        // console.log("Searching the text    :", text);

        //delay the request send to server
        getProductOnSearch(arg)
            .then((res) => {
                // console.log(res.data.data);
                setProducts(res.data.data)
            })
        console.log(products);
    }




    //Price based filteration 
    useEffect(() => {
        // console.log("Request By Pricing");
        fetchProducts({ price: price })
    }, [ok])




    const handleChangeSlider = (value) => {
        // dispatch({
        //     type: "SEARCH_QUERY",     //as we are not using text base search now so we can comment this
        //     payload: { text: "" }
        // })


        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }



    //handle category show filters
    const showCategories = () =>
        categories.map((category) => (<div key={category._id}>
            <Checkbox onChange={handleCheck} className='pb-2 pl-4 pr-4' value={category._id} name="category">
                {category.name}
            </Checkbox>
            <br />
        </div>))

    //handleCheck
    const handleCheck = (e) => {
        // console.log(e.target.value);


        //get the empty arry states to push the category id on check the box and remove from it on uncheck

        const iniTheState = [...categoriesIds]
        const justChecked = e.target.value;
        const foundedInState = iniTheState.indexOf(justChecked)  //return index if found or -1 not avalilable

        if (foundedInState === -1) {
            iniTheState.push(justChecked)
        }
        else {
            iniTheState.splice(foundedInState, 1)
        }

        setCategoriesIds(iniTheState)
        // console.log(iniTheState)

        fetchProducts({ category: iniTheState })
    }




    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-2">
                        <h4> Search and Filter</h4>
                        <hr />


                        {/* Filteration the products */}
                        <Menu defaultOpenKeys={["1", "2", "3"]} mode='inline'>

                            {/* Filter By Price */}
                            <SubMenu
                                key="1"
                                title="$ Price"
                            >

                                <div className='ml-4 mr-4'>
                                    <Slider
                                        max="4449"
                                        range
                                        defaultValue={(v) => `$${v}`}
                                        value={price}
                                        onChange={handleChangeSlider}
                                    >

                                    </Slider>
                                </div>

                            </SubMenu>


                            {/* Filter By categories */}
                            <SubMenu
                                key="2"
                                title="Categories"
                            >

                                <div style={{ marginTop: "-10px" }}>
                                    {/* {JSON.stringify(categories)} */}

                                    {showCategories()}
                                </div>

                            </SubMenu>
                        </Menu>

                    </div>
                    <div className="col-md-9">
                        {loading ? (
                            <h4 className='text-danger mt-3'>Loading...</h4>
                        )
                            :
                            (<h4 className='text-danger mt-3'>Products</h4>)
                        }

                        {products.length < 1 ? <p> No product Available to shop</p> :

                            <div className="row">
                                {products.map((product) => <div key={product._id} className='col-md-4'>

                                    <ProductCard product={product} />

                                </div>)}
                            </div>
                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default Shop