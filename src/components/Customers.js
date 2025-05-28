import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Customers() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const data = async () => {
            const repsponse = await axios.get("http://localhost:9090/user/api/usersData")
            console.log("orderData", repsponse.data);
            setData(repsponse.data);
        }
        data();
    }, [])
    return (
        <div className='container mt-2'>
            <div><h4 className='mt-2 mb-3'>Customer Details</h4>
                {data ? (< table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>CustomerId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Registered</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.OrderData[0].map((orderData, index) => (
                            <tr>

                                <td>{orderData.user_id}</td>
                                <td>{orderData.first_name}{orderData.last_name}</td>
                                <td>{orderData.email}</td>
                                <td>Address</td>
                                <td>{orderData.phone_number}</td>
                                <td>Orders</td>
                                <td>Total Spent</td>
                                <td>{orderData.created_at}</td>
                                <td>status</td>
                                <td>Action</td>
                            </tr>
                        )



                        )}


                    </tbody>
                </table>) : (<div>No OrderData</div>)
                }
            </div>
        </div >
    )
}

export default Customers