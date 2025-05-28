import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
    const navItems = [{ label: 'DashBoard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z" fill="white" />   </svg>, path: "/" },
    { label: 'Products', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"> <path d="M21 6.5l-9-4-9 4V17.5l9 4 9-4V6.5zm-9 13l-7-3.11V8.26l7 3.11v8.13zm1-8.13l7-3.11v8.13l-7 3.11V11.37zM12 10L5.19 6.5 12 3l6.81 3.5L12 10z" /> </svg>, list: [{ label: "productList", path: "/productList", icon: <i class="bi bi-list-task"></i> }, { label: "productAdd", path: "/productAdd", icon: <i class="bi bi-plus-square"></i> }] },
    { label: 'Categories', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"> <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" /></svg>, list: [{ label: "categoryList", path: "/categoryList", icon: <i class="bi bi-list-task"></i> }, { label: "categoryAdd", path: "/categoryAdd", icon: <i class="bi bi-plus-square"></i> }, { label: "Subcategory_Add", path: "/sub_categoryAdd", icon: <i class="bi bi-plus-square"></i> }] },
    { label: 'Orders', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm1 14H8v-2h5v2zm3-4H8v-2h8v2zm0-4H8V7h8v2z" /></svg>, path: "/orders" },
    { label: 'Customers', icon: <i class="bi bi-people"></i>, path: "/customer" }]
    const [collapse, setCollapse] = useState(false);
    const toggleSidebar = () => setCollapse(!collapse);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleSize = () => {
            setWindowWidth(window.innerWidth)
        }
        handleSize();
        window.addEventListener("resize", handleSize)
    }, []);
    const sidebarWidth = collapse ? "75px" : "200px";
    return (
        <div>
            <div style={{ position: "sticky", top: "0px" }}>
                <nav className="navbar navbar-expand-lg ps-3" style={{ backgroundColor: "#044375" }}>
                    {/* Desktop Toggle */}
                    <div className='d-flex justify-content-between align-items-center w-100 me-2'>
                        <div className="d-none d-lg-flex align-items-center">
                            <div
                                onClick={toggleSidebar}
                                style={{ cursor: 'pointer', marginRight: "10px" }}
                            >
                                <svg width="24" height="24" viewBox="0,0,256,256"><g fill="#fff"><g transform="scale(4,4)"><path d="M51,46c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38zM51,30c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38zM51,14c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38z" /></g></g></svg>
                            </div>
                            <span className="navbar-brand text-light ms-1">Payasam-Foods</span>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="d-flex d-lg-none align-items-center" style={{ cursor: 'pointer', marginRight: "10px" }}>
                            <div className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#navbarSupportedContent">
                                <svg width="24" height="24" viewBox="0,0,256,256"><g fill="#fff"><g transform="scale(4,4)"><path d="M51,46c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38zM51,30c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38zM51,14c1.1,0 2,0.9 2,2s-0.9,2-2,2H13c-1.1,0-2-0.9-2-2s0.9-2 2-2h38z" /></g></g></svg>
                            </div>
                            <span className="navbar-brand text-light ms-1">Payasam-Foods</span>
                        </div>
                        <div style={{ color: "white" }} className='d-flex'>
                            <span className='me-2'>payasam karthik</span>
                            <div class="dropstart" style={{ cursor: "pointer" }} >
                                <span data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20" />
                                    </svg>
                                </span>
                                <ul class="dropdown-menu" style={{ marginTop: "40px" }}>
                                    <li><a class="dropdown-item" href="#">My Profile</a></li>
                                    <li><a class="dropdown-item" href="#">Update Password</a></li>
                                    <li><a class="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='d-flex'>
                <div class="collapse d-none d-lg-block" id="navbarSupportedContent1">


                    <ul class="nav flex-column mt-1" style={{ backgroundColor: "#044375", width: sidebarWidth, height: "100vh", position: "fixed" }}>
                        {navItems.map(({ label, icon, path, list }) => (
                            <li className="nav-item" key={label}>
                                {!list ? (
                                    <Link to={path} className="nav-link text-light d-flex align-items-center">
                                        {icon}
                                        {!collapse && <span className="ms-2">{label}</span>}
                                    </Link>
                                ) :

                                    (<div style={{ cursor: "pointer" }}>

                                        <span
                                            className="nav-link text-light d-flex align-items-center"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${label}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse-${label}`}
                                        >
                                            {icon}
                                            {!collapse && <span className="ms-2">{label}</span>}
                                            <i className="bi bi-chevron-down ms-auto"></i>
                                        </span>
                                        <div className="collapse" id={`collapse-${label}`}>
                                            {list.map((item, index) => (

                                                <Link to={`${item.path}`} className="text-light ms-5 mb-1 d-block " style={{ textDecoration: "none" }} key={index}>
                                                    {item.icon}
                                                    <span className='ms-2'>{!collapse ? item.label : null}</span></Link>
                                            ))}
                                        </div>
                                    </div>

                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="offcanvas offcanvas-start d-lg-block" id="navbarSupportedContent">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Payasam-Foods</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="nav flex-column" style={{ backgroundColor: "#044375" }}>
                            {navItems.map(({ label, icon, path, list }) => (
                                <li className="nav-item" key={label}>
                                    {!list ? (
                                        <Link to={path} className="nav-link text-light d-flex align-items-center">
                                            {icon}
                                            {!collapse && <span className="ms-2">{label}</span>}
                                        </Link>
                                    ) :

                                        (<div style={{ cursor: "pointer" }}>

                                            <span
                                                className="nav-link text-light d-flex align-items-center"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-${label}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse-${label}`}
                                            >
                                                {icon}
                                                {!collapse && <span className="ms-2">{label}</span>}
                                                <i className="bi bi-chevron-down ms-auto"></i>
                                            </span>
                                            <div className="collapse" id={`collapse-${label}`}>
                                                {list.map((item, index) => (

                                                    <Link to={`${item.path}`} className="text-light ms-5 mb-1 d-block " style={{ textDecoration: "none" }} key={index}>
                                                        {item.icon}
                                                        <span className='ms-2'>{!collapse ? item.label : null}</span></Link>
                                                ))}
                                            </div>
                                        </div>

                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-grow-1" style={{ marginLeft: windowWidth >= 992 ? sidebarWidth : "0px" }}>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default Navbar