import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Link } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
    const [blogList, setBlogList] = useState([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [websites,setWebsites] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedWebsite, setSelectedWebsite] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const toast = React.useRef(null);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    useEffect(() => {
        fetchWebsite()
        fetchCategory()
        handleFilterBlog()
    }, []);
    // Filter table 
    const handleFilterBlog = async () => {
        const queryParams = new URLSearchParams({
            page: first,
            limit: rows,
            websites: 'websiteId'
        });
        try {
            const response = await axios.get(`http://localhost:8092/category/getAllBlogByWebsiteIdCategoryId/list/?${queryParams.toString()}`)
            console.log(response)
        } catch(error){
            console.log(error)
        }
    }
    // List website Dropdown
    const fetchWebsite = async () => {
        try {
            const response = await fetch('http://localhost:8092/website/getAllWebsite');
            const data = await response.json();
            if (data.status) {
                setWebsites(data.data);  // Update state with the fetched websites
            } else {
                // Handle cases where the response is not OK (e.g., server errors)
                toast.current.show({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to fetch websites', life: 3000 });
            }
        } catch (error) {
            // Handle network errors or issues with the fetch operation
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching websites', life: 3000 });
        }
    };
    const fetchCategory = async () => {
        try{
            const response = await fetch('http://localhost:8092/category/getAllCategory/list');
            const data = await response.json();
            if (data.status) {
                setCategory(data.data);  // Update state with the fetched websites
            } else {
                // Handle cases where the response is not OK (e.g., server errors)
                toast.current.show({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to fetch websites', life: 3000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching websites', life: 3000 });

        }
    }
    const actionBodyTemplate = () => {
        return(
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-success p-mr-2" onClick={() => openBlogViewModal()} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => openBlogEditModal()} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => openBlogDeleteModal()} />
            </React.Fragment>
        )
    }
    const openBlogViewModal = () =>{

    }
    const openBlogEditModal = () =>{
        
    }
    const openBlogDeleteModal = () =>{
        
    }

    return(
        <div className="admin-panel py-5">
            <div className="container">
                <div className="right-align">
                    <div className="card-top">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Select Website</label>
                                <MultiSelect value={selectedWebsite} onChange={(e) => setSelectedWebsite(e.value)} 
                                options={websites.map(website => ({ label: website.websiteName, value: website._id }))} 
                                optionLabel="label"  filter placeholder="Select Website" maxSelectedLabels={3} className="w-full text-start" />
                            </div>
                            <div className="col-md-6">
                                <label>Select Category</label>
                                <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} 
                                options={category.map(category => ({name: category.categoryName, value: category._id}))} optionLabel="name" 
                                placeholder="Select a Category" className="w-full text-start" />
                            </div>
                        </div>
                    </div>
                    <button>
                        <Link to="/blog/create-blog">Add New Blog</Link>
                    </button>
                </div>
                <div className="datatable-responsive-demo">
                    <DataTable value={blogList.slice(first, first + rows)} paginator={false} first={first} rows={rows}>
                        <Column field="blogTitle" header="Blog Title" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                        <Column field="website" header="Website" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                        <Column field="categoryName" header="Category" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column> 
                        <Column field="status" header="Status" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                        <Column field="createdOn" header="Created Date" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                        <Column body={actionBodyTemplate} header="Action" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                    </DataTable>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={blogList.length}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default BlogList