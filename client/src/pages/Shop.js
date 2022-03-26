import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import { getAllProducts, getProductOnSearch } from '../functions/getAllProducts'
import { getCategories } from '../functions/category'
import { useSelector, useDispatch } from 'react-redux'
import { getSubs } from '../functions/sub'
import { Menu, Slider, Checkbox } from 'antd'
import Stars from '../components/stars/Stars'
const { SubMenu } = Menu;


const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false)

    const [categories, setCategories] = useState([])
    const [categoriesIds, setCategoriesIds] = useState([])

    const [star, setStar] = useState("")

    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState('')

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


    //load all subs
    const loadSubs = () => {
        getSubs()
            .then((res) => {
                setSubs(res.data.data)
                // console.log(res.data.data);
            }).catch(err => console.log(err))
        // console.log(subs);
    }


    useEffect(() => {
        loadProduct()
        loadCategories()
        loadSubs()
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

        //to restore the categories section filter
        setCategoriesIds([])
        setStar("")
        setSub('')
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }



    //handle category show filters
    const showCategories = () =>
        categories.map((category) => (<div key={category._id}>
            <Checkbox
                onChange={handleCheck}
                className='pb-2 pl-4 pr-4'
                value={category._id}
                name="category"
                checked={categoriesIds.includes(category._id)}
            >
                {category.name}
            </Checkbox>
            <br />
        </div>))

    //handleCheck
    const handleCheck = (e) => {
        // console.log(e.target.value);

        //to reset the price filter
        setPrice([0, 0])
        setStar('')

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




    //stars Rating request Handler

    const handelStarClick = (num) => {
        console.log(num);
        setCategoriesIds([])    //reset teh catergories
        setPrice([0, 0])    //reset the price
        setStar(num)
        setSub('')
        fetchProducts({ stars: num })

    }



    //handle Sub category filter

    // const showSubs = () => 

    const handleSubRequest = (sub) => {
        // console.log(s);
        setSub(sub)
        setPrice([0, 0])
        setCategoriesIds([])
        setStar("")
        fetchProducts({ sub: sub })


    }




    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-2">
                        <h4> Search and Filter</h4>
                        <hr />


                        {/* Filteration the products */}
                        <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode='inline'>

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



                            {/* Star based Products */}
                            <SubMenu
                                key="3"
                                title="Ratings"
                            >

                                <div style={{ marginTop: "-10px" }}>
                                    {/* {showStar()} */}

                                    <div className='pr-4 pl-4 pb-2'>
                                        <Stars starClick={handelStarClick} numberOfStars={5} />
                                        <Stars starClick={handelStarClick} numberOfStars={4} />
                                        <Stars starClick={handelStarClick} numberOfStars={3} />
                                        <Stars starClick={handelStarClick} numberOfStars={2} />
                                        <Stars starClick={handelStarClick} numberOfStars={1} />
                                    </div>
                                </div>

                            </SubMenu>


                            {/* Filter By sub categories */}
                            <SubMenu
                                key="4"
                                title=" Sub Categories"
                            >

                                <div style={{ marginTop: "-10px" }}>

                                    {/* {
                                        subs.map((sub) => {
                                            <div onClick={() => handleSubRequest(sub)} className='p-1 m-1 badge badge-secondary'> {sub.name}</div>
                                        })
                                    } */}


                                    {subs.map((s) => <div key={s._id} onClick={() => handleSubRequest(s)} className='p-1 m-1 badge badge-secondary' style={{ cursor: "pointer" }}>
                                        {s.name}
                                    </div>
                                    )}


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