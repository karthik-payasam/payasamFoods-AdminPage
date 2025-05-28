import React, { useRef, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
function ProductAdd() {
    const [productData, setProductData] = useState({ product_name: "", weights: [{ weight_value: "", weight_unit: "", price: "", stock_quantity: "" }], category_id: "", description: "", product_image: null })
    const fileInputRef = useRef(null);
    const handleInputData = (e) => {
        const { name, value, files } = e.target;

        if (name === "product_image") {
            setProductData((prev) => ({ ...prev, product_image: files[0] }));
        } else {
            setProductData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleWeightChange = (index, e) => {
        const newWeights = [...productData.weights];
        newWeights[index][e.target.name] = e.target.value;
        setProductData((pre) => ({ ...pre, weights: newWeights }))
    }
    const addWeight = () => {
        setProductData((pre) => ({ ...pre, weights: [...pre.weights, { price: "", weight_value: "", weight_unit: "", stock_quantity: "" }] }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product_name", productData.product_name)
        formData.append("category_id", productData.category_id)
        formData.append("description", productData.description);
        formData.append("product_image", productData.product_image)
        formData.append("weights", JSON.stringify(productData.weights))
        try {
            const response = await axios.post("http://localhost:9090/user/api/insert/productData", formData)
            console.log("insertion", response)
            toast.success("Product added successfully!");
            setProductData({ product_name: "", weights: [{ weight_value: "", weight_unit: "", price: "", stock_quantity: "" }], category_id: "", description: "", product_image: null })
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
        catch (error) {
            console.error("Error inserting product:", error);
            toast.error("product data is not inserted")
            setProductData({ product_name: "", weights: [{ weight_value: "", weight_unit: "", price: "", stock_quantity: "" }], category_id: "", description: "", product_image: null })
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    }

    return (
        <div className='container mt-2'>
            <div class="card">
                <div class="card-header">
                    <b>Add Product Data</b>
                </div>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>

                        <label className="form-label">Product Name</label>
                        <input type='text' placeholder='Enter Product Name' className='form-control mt-2' name="product_name" value={productData.product_name} onChange={handleInputData} />

                        <label>Category</label>
                        <select className="form-select mt-2 mb-2" name="category_id" value={productData.category_id} onChange={handleInputData} >
                            <option value="" disabled>Select Category</option>
                            <option value="1">Sweets</option>
                            <option value="2">Namkeen</option>
                            <option value="3">Pickles</option>
                            <option value="4">DailyEssentials</option>
                            <option value="5">ChilliPowders</option>
                            <option value="6">Gifts</option>

                        </select>

                        <label>Product Description</label>
                        <textarea rows="3" className='form-control' name="description" value={productData.description} onChange={handleInputData}></textarea>
                        <label>Product Image</label>
                        <input type='file' className='form-control mt-2 mb-3' name="product_image" onChange={handleInputData} ref={fileInputRef} />
                        <label><b>Weight Variants</b></label>


                        {productData.weights.map((itemsData, index) => (
                            <div className="row mt-3 mb-2" key={index}>

                                <div className="col-md-3">
                                    <label className="form-label">Weight of Product</label>
                                    <input type="text" placeholder="Enter Weight" className="form-control" name="weight_value" value={itemsData.weight_value} onChange={(e) => { handleWeightChange(index, e) }} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Unit of Product</label>
                                    <select className="form-select" name="weight_unit" value={itemsData.weight_unit} onChange={(e) => { handleWeightChange(index, e) }}>
                                        <option value="" disabled>Select Unit</option>
                                        <option value="gm">Gm</option>
                                        <option value="kg">Kg</option>
                                    </select>

                                </div>
                                <div className="col-md-3" >
                                    <label className="form-label" >Price</label>
                                    <input type="text" placeholder="Enter Price" className="form-control" name="price" value={itemsData.price} onChange={(e) => { handleWeightChange(index, e) }} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Stocks of Product</label>
                                    <input type="text" placeholder="Enter Weight" className="form-control" name="stock_quantity" value={itemsData.stock_quantity} onChange={(e) => { handleWeightChange(index, e) }} />
                                </div>
                            </div>))}

                        <button type="button" onClick={addWeight} className="btn btn-outline-primary btn-sm mb-3">+ Add Another Variant</button>



                        <div className='text-end'><button type="submit" className=" btn btn-success">Add Product</button></div>

                    </form>
                </div>
            </div >


        </div >
    )
}

export default ProductAdd