import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Order() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const data = async () => {
            const repsponse = await axios.get("http://localhost:9090/user/api/fetchorderdata")
            console.log("orderData", repsponse.data);
            setData(repsponse.data);
        }
        data();
    }, [])
    return (
        <div className='container mt-2'>
            <div><h4 className='mt-2 mb-3'>Order Details</h4>
                {data ? (< table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>OrderId</th>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Billing Address</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.OrderData.map((orderData) => {
                            const userDetails = orderData.order_user_Details[0];
                            const billingDetails = orderData.billing_details[0];

                            return (
                                <tr key={orderData.id}>
                                    <td>ORD{orderData.id}</td>
                                    <td>{userDetails.firstname} {userDetails.lastname}</td>
                                    <td>{userDetails.phonenumber}</td>
                                    <td>
                                        {userDetails.country}, {userDetails.state}, {userDetails.city}, {userDetails.pincode}<br />
                                        {userDetails.address}, {userDetails.appartment}
                                    </td>
                                    <td>
                                        {billingDetails.country}, {billingDetails.state}, {billingDetails.city}, {billingDetails.pincode}<br />
                                        {billingDetails.address}, {billingDetails.appartment}
                                    </td>
                                    <td>
                                        <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                                            {orderData.order_details.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.product_name} × {item.qty}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{orderData.netAmount}</td>
                                    <td>paymentMode</td>
                                    <td>status</td>
                                    <td>{orderData.createdAt}</td>
                                    <td><button>Action</button></td>
                                </tr>
                            );
                        })}


                    </tbody>
                </table>) : (<div>No OrderData</div>)
                }
            </div>
        </div >
    )
}

export default Order