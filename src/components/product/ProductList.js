import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProductList() {
    const navigate = useNavigate();
    const [data, setData] = useState({ category_id: "", sub_category_id: "" })
    const [productData, setProductData] = useState(null)
    const [categorySubcategoryData, setCategorySubCategoryData] = useState([]);
    const [editProductData, setEditProductData] = useState({ product_name: "", description: "", weights: [{ weight_value: "", weight_unit: "", price: "" }] })
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
    const handleEdit = (product_id) => {
        const ProductDetails = productData.categoryDataDetails.find((data) => data.product_id === product_id)
        console.log("ProductDetails", ProductDetails)
        setEditProductData(ProductDetails)
        console.log("detailsdata", editProductData)
    }
    const addweightItem = () => {
        setEditProductData((pre) => ({ ...pre, weights: [...pre.weights, { weight_value: "", weight_unit: "", price: "" }] }))
    }
    const handleEditChanges = (e) => {
        const { name, value } = e.target
        setEditProductData((prev) => ({ ...prev, [name]: value }))

    }

    const handleChangeWeights = (index, e) => {
        const newWeights = [...editProductData.weights];
        newWeights[index][e.target.name] = e.target.value;

        console.log("new", newWeights)
        setEditProductData((pre) => ({ ...pre, weights: newWeights }))
    }
    const handleProductData = async () => {
        try {
            const response = await axios.put("http://localhost:9090/user/api/updateProductData", editProductData)
            console.log(response);
            setProductData((prev) => {
                const updateProductData = prev.categoryDataDetails.map((item, index) => {
                    if (item.product_id === editProductData.product_id) {

                        return { ...editProductData }
                    }
                    return item
                })
                return { ...prev, categoryDataDetails: updateProductData }
            })

        }
        catch (err) {
            throw err;
        }
    }
    const handleDeleteFunction = async (product_id) => {
        if (window.confirm("Are delete the product..")) {
            const response = await axios.delete(`http://localhost:9090/user/api/deleteProductData/${product_id}`); // ✅ API call to delete
            console.log(response);
            setProductData((prev) => {
                const updated = prev.categoryDataDetails.filter((item) => item.product_id !== product_id);
                return { ...prev, categoryDataDetails: updated };
            });
        }
    }
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
                                                <td>{`${ProductData1.created_at.split("T")[0]}`}</td>
                                                <td className='d-flex'>
                                                    <button className='btn btn-sm btn-warning me-1' data-bs-toggle="modal" data-bs-target="#productpopup" onClick={() => { handleEdit(ProductData1.product_id) }}>Edit</button>
                                                    <div class="modal fade" id="productpopup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Product Edit</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div>
                                                                        <div className='form-group mb-3'>
                                                                            <label>Product Name</label>
                                                                            <input type="text" className="form-control" name="product_name" value={editProductData.product_name} onChange={handleEditChanges} />

                                                                        </div>
                                                                        <div className='form-group mb-3'>
                                                                            <label>Product Description</label>
                                                                            <textarea name="description" value={editProductData.description} className='form-control mt-2' onChange={handleEditChanges} ></textarea>
                                                                        </div>
                                                                        <div className='form-group mb-3'>
                                                                            <label>Weights</label>
                                                                            {editProductData.weights.map((itemsData, index) => (
                                                                                <div className="row mt-3 mb-2" key={index}>

                                                                                    <div className="col-md-4">
                                                                                        <label className="form-label">Weight of Product</label>
                                                                                        <input type="text" placeholder="Enter Weight" className="form-control" name="weight_value" value={itemsData.weight_value} onChange={(e) => (handleChangeWeights(index, e))} />
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="form-label">Unit of Product</label>
                                                                                        <select className="form-select" name="weight_unit" value={itemsData.weight_unit} onChange={(e) => (handleChangeWeights(index, e))}>
                                                                                            <option value="" disabled>Select Unit</option>
                                                                                            <option value="gm">Gm</option>
                                                                                            <option value="kg">Kg</option>
                                                                                        </select>

                                                                                    </div>
                                                                                    <div className="col-md-4" >
                                                                                        <label className="form-label" >Price</label>
                                                                                        <input type="text" placeholder="Enter Price" className="form-control" name="price" value={itemsData.price} onChange={(e) => (handleChangeWeights(index, e))} />
                                                                                    </div>

                                                                                </div>
                                                                            ))}
                                                                            <button className='btn btn-sm btn-primary' onClick={addweightItem}>+Add Item</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary" onClick={() => { handleProductData() }} data-bs-dismiss="modal">Save Changes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className='btn btn-sm btn-danger me-1' onClick={() => { handleDeleteFunction(ProductData1.product_id) }}>Delete</button>
                                                </td>
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