import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const CategoryList = () => {
    const [categoryListItem, setCategoryListItem] = useState([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [addCategoryModal, setAddcategoryModal] = useState(false);
    const [editCategoryModal, setEditCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryDescr, setCategoryDescr] = useState("empty");
    const toast = React.useRef(null);
     // Fetch data from an API on component mount
     useEffect(() => {
        fetchCatagories()
    }, []);

    const fetchCatagories = () =>{
        fetch('https://dev-blog-api.myamberinnovations.com/category')
        .then(res => res.json())
        .then(response => {
            // console.log(response); // Debug: Log the fetched data
            setCategoryListItem(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
     }

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    

    const actionBodyTemplate = (rowdata) => {
        // console.log(rowdata)
        return(
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => openEditModal(rowdata)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => openDeleteModal(rowdata)} />
            </React.Fragment>
        )
    }

   

    const dialogFuncMap = {'addCategoryModal': setAddcategoryModal, 'editCategoryModal' : setEditCategoryModal, 'deleteCategoryModal': setDeleteCategoryModal};

    const onShow = (name) => {
        dialogFuncMap[name](true);
    };

    const onHide = (name) => {
        dialogFuncMap[name](false);
    };

    const renderFooter = (name) => {
        return (
            <div className="row">
                <div className="col-md-6">
                    <Button className="btn btn-primary w-100 mb-2 mt-3" label="Submit" onClick={() => onHide(name)} />
                </div>
                <div className="col-md-6">
                    <Button className="btn btn-secondary w-100 mb-2 mt-3 p-button-text" label="Cancel" onClick={() => onHide(name)} />
                </div>
            </div>
        );
    };
  
    const openEditModal = (rowdata) => {
        setSelectCategory(rowdata)
        setEditCategoryModal(true)
        setNewCategoryName(rowdata.categoryName)
    }
    const openDeleteModal = (rowdata) => {
        setSelectCategory(rowdata)
        setDeleteCategoryModal(true)
        
    }
    const handleDelete = async () => {
        const { _id } = selectCategory;
        console.log(`Delected ID :${_id}`)
        const deleteOption = {
            method: 'DELETE'
        }
        const reqUrl = `http://localhost:8092/category/${_id}`
        const result = await fetch(reqUrl,deleteOption)
        if(result.ok){
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category Deleted successfully', life: 3000 });
            onHide('deleteCategoryModal');
            fetchCatagories(); 
        }
        else{
            toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 3000 });
        }
    }
    const handleCategotyAdd = async (e) => {
        e.preventDefault();
            try{
                if (newCategoryName.trim()) {
                    const response = await fetch('http://localhost:8092/category', {
                        method: 'POST',
                        headers: {  
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify({ categoryName: newCategoryName, description: categoryDescr })
                    })
                    if (response.ok) {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category added successfully', life: 3000 });
                        fetchCatagories();  // Refresh the category list
                        setNewCategoryName("");
                        onHide('addCategoryModal'); // Close the modal
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
                    }
                }
            }
            catch (error){
                console.error("Error adding category:", error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add category', life: 3000 });
            }
    }
    const handleEdit = async () =>  {
        const { _id } = selectCategory;
        // console.log(`edit: ${_id}`)
        try{
            const response = await fetch(`http://localhost:8092/category/${_id}`, {
                method: 'PUT',
                headers: {  
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ categoryName: newCategoryName, description: categoryDescr })
            })
            if (response.ok) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Category added successfully', life: 3000 });
                fetchCatagories();  // Refresh the category list
                setNewCategoryName("");
                onHide('editCategoryModal'); // Close the modal
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }

        } catch (error){
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add category', life: 3000 });
        }
    }

    return(
        <div className="admin-panel py-5">
            <Toast ref={toast} />
            <div className="container">
                <div className="right-align">
                    <div className="card-top"></div>
                    <button onClick={() => onShow('addCategoryModal')}>Add New Category</button>
                </div>
                <div className="datatable-responsive-demo">
                    <DataTable value={categoryListItem.slice(first, first + rows)} paginator={false} first={first} rows={rows}>
                        <Column field="categoryName" header="Category Name" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }} style={{ width: '60%' }}></Column>
                        <Column body={actionBodyTemplate} header="Action" headerStyle={{ backgroundColor: '#007ad9', color: '#fff' }}  style={{ width: '40%' }}></Column>
                    </DataTable>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={categoryListItem.length}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageChange={onPageChange}
                    />
                </div>
                <Dialog 
                    header="Add Category" 
                    visible={addCategoryModal} 
                    style={{ width: '50vw' }} 
                    // footer={renderFooter('addCategoryModal')} 
                    onHide={() => onHide('addCategoryModal')}>
                        <div>
                            <form className="my-3"> 
                                <div className="form-group">
                                    <label>Category Name<span className="text-danger">*</span></label>
                                    <InputText className="loginInput mt-2" id="categoryName" 
                                        value={newCategoryName}  
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Category Name" 
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary w-100 mb-2 mt-3" onClick={handleCategotyAdd}>Submit</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-secondary w-100 mb-2 mt-3" onClick={() => onHide('addCategoryModal')}>Cancel</button>
                                    </div>
                                </div>
                            </form>  
                        </div>
                </Dialog>
                <Dialog 
                    header="Edit Category" 
                    visible={editCategoryModal} 
                    style={{ width: '50vw' }} 
                    // footer={renderFooter('editCategoryModal')} 
                    onHide={() => onHide('editCategoryModal')}>
                        <div>
                            <form className="my-3"> 
                                <div className="form-group">
                                    <label>Category Name<span className="text-danger">*</span></label>
                                    <InputText className="loginInput mt-2" id="categoryName" 
                                        value={newCategoryName}  
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Category Name" 
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary w-100 mb-2 mt-3" onClick={handleEdit}>Submit</button> 
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-secondary w-100 mb-2 mt-3" onClick={() => onHide('editCategoryModal')}>Cancel</button>
                                    </div>
                                </div>
                            </form>  
                        </div>
                </Dialog>
                <Dialog 
                    header="Delete Category" 
                    visible={deleteCategoryModal} 
                    style={{ width: '50vw' }} 
                    onHide={() => onHide('deleteCategoryModal')}>
                        <div>
                            <form className="my-3"> 
                               <p>Are you sure, Do you want Delete?</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary w-100 mb-2 mt-3" onClick={()=> handleDelete()}>yes</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-secondary w-100 mb-2 mt-3" onClick={() => onHide('deleteCategoryModal')}>Cancel</button>
                                    </div>
                                </div>
                            </form>  
                        </div>
                </Dialog>
                
            </div>
        </div>
    )
}

export default CategoryList