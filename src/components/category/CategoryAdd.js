import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
function CategoryAdd() {
    const [categoryData, setCategoryData] = useState({ category_name: "", category_image: null, description: "" })
    const fileInputRef = useRef(null)
    const handleData = (e) => {
        const { name, value, files } = e.target
        if (name === "category_image") {
            setCategoryData((prev) => ({ ...prev, category_image: files[0] }))
        }
        else {
            setCategoryData((prev) => ({ ...prev, [name]: value }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_name", categoryData.category_name)
        formData.append("category_image", categoryData.category_image)
        formData.append("description", categoryData.description)
        try {
            const response = await axios.post("http://localhost:9090/user/api/insert/category", formData)
            console.log("insertion", response)
            toast.success("cartegory added successfully!");
            setCategoryData({ category_name: "", category_image: null, description: "" })
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
                    Add New Category
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <label>Category Name</label>
                        <input type='text' className='form-control mt-2 mb-2' placeholder='Enter category name' name="category_name" value={categoryData.category_name} onChange={handleData} />
                        <label>Description</label>
                        <textarea className='form-control mt-2 mb-2' placeholder="Enter description " rows={4} name="description" value={categoryData.description} onChange={handleData} ></textarea>
                        <label>Category Image</label>
                        <input type='file' className='form-control  mt-2' name="category_image" onChange={handleData} ref={fileInputRef} />
                        <div className='text-end'> <button type='submit' className='btn btn-success mt-2'>Add Category</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryAdd