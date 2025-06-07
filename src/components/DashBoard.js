import React, { useEffect, useState } from 'react';
import axios from 'axios'

import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Daily Sales Chart',
        },
    },
};
const optionsPie = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'UserData',
        },
    },
};



export function App() {
    const [chartDataDailtSale, setChartDataDailtSale] = useState({ labels: [], datasets: [] })
    const [chartDatauser, setChartDatausers] = useState({ labels: [], datasets: [] })
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:9090/user/api/chardatabyorders")
            console.log("responsedata", response.data.OrderData.usersdetailsdata);
            const orders = response.data.OrderData.userOrders
            const labels = orders.map((items, index) => items.c_date.split('T')[0])
            const data = orders.map((items, index) => parseFloat(items.total))
            const user = response.data.OrderData.usersdetailsdata
            const userlabels = user.map((items, index) => items.role_name)
            console.log("label", userlabels);
            const userdata = user.map((items, index) => items.user_count)
            setChartDataDailtSale({
                labels,
                datasets: [
                    {
                        label: "order Total",
                        data,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',

                    }
                ]
            })
            setChartDatausers({
                labels: userlabels,
                datasets: [
                    {
                        label: "User Count",
                        data: userdata,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
        fetchData();
    }, [])
    return (
        <>
            <div className='d-flex justify-content-center'>
                <div style={{
                    width: '400px',
                    height: '300px',
                    marginTop: "15px",
                    padding: '10px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <Bar options={options} data={chartDataDailtSale} style={{ width: "50%", height: "50%" }} />
                </div>
                <div style={{
                    width: '400px',
                    height: '300px',
                    marginLeft: "15px",
                    marginTop: "15px",
                    padding: '10px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>  <Pie data={chartDatauser} options={optionsPie} /></div >
            </div>
        </>
    )
}

export default App;
