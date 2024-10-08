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
     // Fetch both websites and categories on mount
     useEffect(() => {
        const fetchInitialData = async () => {
            await fetchWebsite();   // Fetch websites
            await fetchCategory();  // Fetch categories
        };
        fetchInitialData();
    }, []);  // Only run on component mount

    // Fetch blog list when both selectedWebsite and selectedCategory are set
    useEffect(() => {
        if (selectedWebsite && selectedCategory) {
            handleFilterBlog(selectedCategory, selectedWebsite);
        }
    }, [selectedWebsite, selectedCategory]);  // Trigger filtering only when both values are set


    // Filter table 
    const handleFilterBlog = async (categoryId,websiteId) => {
        // console.log(websiteId)
        const queryParams = new URLSearchParams({
            page: first,
            limit: rows,
            websites: websiteId
        });
        // console.log(queryParams)
        try {
            const response = await axios.get(`http://localhost:8092/category/getAllBlogByWebsiteIdCategoryId/list/${categoryId}?${queryParams.toString()}`)
            // console.log(response)
            const data = await response.data;
            
            if (data.status) {
                setBlogList(data.data);  // Update state with the fetched websites
            } else {
                // Handle cases where the response is not OK (e.g., server errors)
                // toast.current.show({ severity: 'error', summary: 'Error', detail: data.message || 'Failed to fetch data', life: 3000 });
            }
        } catch(error){
            // toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data', life: 3000 });
        }
    }
    // List website Dropdown
    const fetchWebsite = async () => {
        try {
            const response = await fetch('http://localhost:8092/website/getAllWebsite');
            const data = await response.json();
            if (data.status) {
                setWebsites(data.data);  // Update state with the fetched websites
                setSelectedWebsite([data.data[0]._id]); 
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
                const defaultCategory = [{_id: 'null', categoryName: 'All'}]
                const mergedCategories = [...defaultCategory, ...data.data];
                setCategory(mergedCategories);  // Update state with the fetched websites
                setSelectedCategory(mergedCategories[0]._id)
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
    const filterCategory = (categoryId) => {
        setSelectedCategory(categoryId)
        handleFilterBlog(categoryId,selectedWebsite)
    }
    const filterWebsite = (websiteId) => {
        setSelectedWebsite(websiteId)
        handleFilterBlog(selectedCategory,websiteId)
    }

    return(
        <div className="admin-panel py-5">
            <div className="container">
                <div className="right-align">
                    <div className="card-top">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Select Website</label>
                                <MultiSelect value={selectedWebsite} onChange={(e) => {setSelectedWebsite(e.value); filterWebsite(e.value)}} 
                                options={websites.map(website => ({ label: website.websiteName, value: website._id }))} 
                                optionLabel="label"  filter placeholder="Select Website" maxSelectedLabels={3} className="w-full text-start" />
                            </div>
                            <div className="col-md-6">
                                <label>Select Category</label>
                                <Dropdown value={selectedCategory} onChange={(e) => {setSelectedCategory(e.value); filterCategory(e.value)}} 
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
                        <Column field="website" header="Website" body={(rowData) => rowData.website.map(site => site.websiteName).join(', ')} headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column>
                        <Column field="categoryName" header="Category" body={(rowData) => rowData.category.categoryName} headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}></Column> 
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