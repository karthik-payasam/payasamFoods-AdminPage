import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CategoryList() {
    const [list, setList] = useState([])
    const [subList, setSubList] = useState(null)
    const [editCategory, setEditCategory] = useState({ category_id: "", name: "", description: "" })
    const [editSubCategory, setEditSubCategory] = useState({ subcategory_id: "", name: "", description: "" })

    useEffect(() => {
        const handleData = async () => {
            const response = await axios.get("http://localhost:9090/user/api/fetch/getCategoryAndSubCategories")
            setList(response.data.CategoryData);
            console.log("response", response.data.CategoryData)
        }
        handleData();
    }, [])
    const handleSubCategoryData = (category_id) => {
        const dataDetails = list.find((data) => data.category_id === category_id)
        console.log("dataDetails", dataDetails)
        setSubList(dataDetails);
    }
    const editCategoryData = (category_id) => {
        const dataDetails = list.find((data) => data.category_id === category_id)
        setEditCategory({ ...dataDetails });
    }
    const editSubCategoryData = (sub) => {
        console.log("sub", sub)
        setEditSubCategory({ ...sub })
    }
    const handleEditInputChange = (e) => {
        const { name, value } = e.target
        setEditCategory((pre) => ({ ...pre, [name]: value }))
    }
    const saveEditedCategory = async () => {
        try {
            await axios.post(`http://localhost:9090/user/api/updateCategory/${editCategory.category_id}/${editCategory.name}`)
            alert("Category updated!");
            // Refresh the list
            const response = await axios.get("http://localhost:9090/user/api/fetch/getCategoryAndSubCategories")
            setList(response.data.CategoryData);
        }
        catch (err) {
            console.error("Error updating category", err)
        }
    }
    const handleSubEditInputChange = (e) => {
        const { name, value } = e.target
        setEditSubCategory((pre) => ({ ...pre, [name]: value }))
    }

    const saveEditedSubCategory = async () => {
        try {
            await axios.post(`http://localhost:9090/user/api/updateSubCategory/${editSubCategory.subcategory_id}/${editSubCategory.name}/0`)
            alert("SubCategory updated!");
            // Refresh the list
            const response = await axios.get("http://localhost:9090/user/api/fetch/getCategoryAndSubCategories")
            setList(response.data.CategoryData);
            const updatedCategory = response.data.CategoryData.find(data => data.category_id === editCategory.category_id);
            setSubList(updatedCategory);
        }
        catch (err) {
            console.error("Error updating category", err)
        }
    }
    const deleteSubCategory = async (subcategory_id) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            try {
                await axios.post(`http://localhost:9090/user/api/updateSubCategory/0/0/${subcategory_id}`)
                alert("Category updated!");
                // Refresh the list
                const response = await axios.get("http://localhost:9090/user/api/fetch/getCategoryAndSubCategories")
                setList(response.data.CategoryData);
                const updatedCategory = response.data.CategoryData.find(data => data.category_id === editCategory.category_id);
                setSubList(updatedCategory);
            }
            catch (err) {
                console.error("Error updating category", err)
            }
        }
    }
    return (
        <div className='card'>

            <div className='d-flex justify-content-between ms-3 mt-3'>
                <h5 >Category Management</h5>
                <div>
                    <Link to="/categoryAdd" ><button className='btn btn-primary'>Add Category</button></Link>
                    <Link to="/sub_categoryAdd"><button className='btn btn-outline-primary ms-2 me-2'>Add SubCategory</button></Link>
                </div>

            </div>
            <div className="card-header bg-primary text-white mt-3">
                <strong>Category List</strong>
            </div>
            <div className='card-body'>
                <table className='table bordered'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {list.map((listData, index) => (

                            <tr key={index}  >
                                <td style={{ cursor: "pointer" }} onClick={() => { handleSubCategoryData(listData.category_id) }}>{listData.category_id}</td>
                                <td style={{ cursor: "pointer" }} onClick={() => { handleSubCategoryData(listData.category_id) }}>{listData.name}</td>
                                <td>{listData.description}</td>
                                <td>{`${listData.created_at.split("T")[0]}`}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-1" onClick={() => { editCategoryData(listData.category_id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className='form-group mb-3'>
                                                        <label>Category Name</label>
                                                        <input type="text" className="form-control" name="name" value={editCategory.name} onChange={handleEditInputChange} />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary" onClick={saveEditedCategory} data-bs-dismiss="modal">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
                <div className="card-header bg-secondary text-white mt-4">
                    <strong>
                        Subcategories {subList ? `under "${subList.name}"` : ' - Select a category to view'}
                    </strong>
                </div>
                <table className='table bordered'>
                    <thead>
                        <tr>

                            <th>Subcategory ID</th>
                            <th>Subcategory Name</th>
                            <th>Parent Category</th>
                            <th>Label</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subList ? (
                            subList.subCategory.length > 0 ? (
                                subList.subCategory.map((sub, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{sub.name}</td>
                                        <td>
                                            <span className="badge bg-info text-dark">{subList.name}</span>
                                        </td>
                                        <td>
                                            <span className="badge bg-secondary">Subcategory</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-1" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => { editSubCategoryData(sub) }}>Edit</button>
                                            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit SubCategory</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className='form-group mb-3'>
                                                                <label>SubCategory Name</label>
                                                                <input type="text" className="form-control" name="name" value={editSubCategory.name} onChange={handleSubEditInputChange} />
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary" onClick={saveEditedSubCategory} data-bs-dismiss="modal">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-danger" onClick={() => { deleteSubCategory(sub.subcategory_id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">No Subcategories Found</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">Select a category to view subcategories</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryList