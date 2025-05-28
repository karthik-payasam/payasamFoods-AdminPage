import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

function Subcategory() {
    const [sub_categoryData, setSubCategoryData] = useState({ sub_category_name: "", sub_category_image: null, category_id: "" })
    const fileInputRef = useRef(null)
    const handleData = (e) => {
        const { name, value, files } = e.target
        if (name === "sub_category_image") {
            setSubCategoryData((prev) => ({ ...prev, sub_category_image: files[0] }))
        }
        else {
            setSubCategoryData((prev) => ({ ...prev, [name]: value }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("sub_category_name", sub_categoryData.sub_category_name)
        formData.append("sub_category_image", sub_categoryData.sub_category_image)
        formData.append("category_id", sub_categoryData.category_id)
        try {
            const response = await axios.post("http://localhost:9090/user/api/insert/sub_category", formData)
            console.log("insertion", response)
            toast.success("cartegory added successfully!");
            setSubCategoryData({ sub_category_name: "", sub_category_image: null, category_id: "" })
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
        catch (error) {
            console.error("Error inserting Category:", error);
            toast.error("cartegory not Added!");
        }

    }
    return (
        <div className='container mt-2'>
            <div className='card'>
                <div className='card-header bg-primary text-light'>
                    Add New Sub_Category
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <label>Sub_Category Name</label>
                        <input type='text' className='form-control mt-2 mb-2' placeholder='Enter category name' name="sub_category_name" value={sub_categoryData.sub_category_name} onChange={handleData} />
                        <label>Category</label>
                        <select className="form-select mt-2 mb-2" name="category_id" value={sub_categoryData.category_id} onChange={handleData} >
                            <option value="" disabled>Select Category</option>
                            <option value="1">Sweets</option>
                            <option value="2">Namkeen</option>
                            <option value="3">Pickles</option>
                            <option value="4">DailyEssentials</option>
                            <option value="5">ChilliPowders</option>
                            <option value="6">Gifts</option>

                        </select>
                        <label>Sub_Category Image</label>
                        <input type='file' className='form-control  mt-2' name="sub_category_image" onChange={handleData} ref={fileInputRef} />
                        <div className='text-end'> <button type='submit' className='btn btn-success mt-2'>Add Sub_Category</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Subcategory