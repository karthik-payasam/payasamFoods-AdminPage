import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CategoryList() {
    const [list, setList] = useState([])
    const [subList, setSubList] = useState(null)
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
    return (
        <div className='card'>

            <div className='d-flex justify-content-between ms-3 mt-3'>
                <h5 >Category Management</h5>
                <div>
                    <button className='btn btn-primary'>Add Category</button>
                    <button className='btn btn-outline-primary ms-2 me-2'>Add SubCategory</button>
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

                            <tr key={index} onClick={() => { handleSubCategoryData(listData.category_id) }} >
                                <td style={{ cursor: "pointer" }}>{listData.category_id}</td>
                                <td style={{ cursor: "pointer" }}>{listData.name}</td>
                                <td>{listData.description}</td>
                                <td>{listData.created_at}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-1">Edit</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
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
                                            <button className="btn btn-sm btn-warning me-1">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
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