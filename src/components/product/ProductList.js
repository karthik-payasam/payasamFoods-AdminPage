import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProductList() {
    const navigate = useNavigate();
    const [data, setData] = useState({ category_id: "", sub_category_id: "" })
    const [productData, setProductData] = useState(null)
    const [categorySubcategoryData, setCategorySubCategoryData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const repsponse = await axios.get("http://localhost:9090/user/api/fetch/getCategoryAndSubCategories")
            console.log("category_data", repsponse.data);
            setCategorySubCategoryData(repsponse.data.CategoryData)
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:9090/user/api/fetch/AllproductDetailsbyCategory", {
                    params: { category_id: data.category_id, sub_category_id: data.sub_category_id }
                });
                console.log(response.data);
                setProductData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchProducts();
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const selectedCategory = categorySubcategoryData.find(cat => cat.category_id.toString() === data.category_id);
    console.log("selectedCategory", selectedCategory)
    return (
        <div className='container mt-2'>
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <b>All Products Data List</b>
                    <div className='d-inline'>
                        <button className='btn btn-primary me-2' onClick={() => { navigate("/productAdd") }}>Add Product</button>
                        <button className='btn btn-outline-primary'>This Month</button>
                    </div>
                </div>
                <div class="card-body">
                    <div className='row'>
                        <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                            Select Product Category

                            <select className='form-select mt-2' name="category_id" value={data.category_id} onChange={handleChange}>

                                <option value="">-- Select Category --</option>
                                {categorySubcategoryData.map((cat, idx) => (
                                    <option key={idx} value={cat.category_id}>{cat.name}</option>
                                ))}


                            </select>

                        </div>
                        <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
                            Select Product SubCategory
                            <select className='form-select mt-2' name="sub_category_id" value={data.sub_category_id} onChange={handleChange}>
                                <option value="">All</option>
                                {selectedCategory?.subCategory?.map((sub) => (
                                    <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.name}</option>
                                ))}

                            </select>

                        </div>
                    </div>
                    <div>

                        <div>
                            <h5 className='mt-3 mb-2'>Sweets</h5>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>S.no</th>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Weights-Price(₹)</th>

                                        <th>Stock</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData?.categoryDataDetails?.length > 0 ? (

                                        productData.categoryDataDetails.map((ProductData1, index) => (
                                            < tr >
                                                {console.log("pppp", ProductData1)}
                                                <td>{index + 1}</td>
                                                <img src={`http://localhost:9090/${ProductData1.product_image}`} style={{ width: "100%", height: "auto" }} />
                                                <td>{ProductData1.product_name}</td>
                                                <td>{ProductData1.description}</td>
                                                <td>{ProductData1.weights.map((weightsValue, indexValue) => (
                                                    <div>{weightsValue.weight_value}{weightsValue.weight_unit}-{weightsValue.price}₹</div>
                                                ))}</td>

                                                <td>Stock</td>
                                                <td>{ProductData1.created_at}</td>
                                                <td><button>Actions</button></td>
                                            </tr>
                                        ))

                                    ) : (<div>No data Found</div>)}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>


        </div >
    )
}

export default ProductList