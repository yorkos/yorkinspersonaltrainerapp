import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTrainings from './AddTrainings';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function Customerlist() {

    const [customer, setCustomer] = useState([]);

    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = useState('');

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomer(data.content))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data2 => setTrainings(data2.content))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {
                if (response.ok)
                    fetchCustomers();
                else
                    alert('Could not add a new customer')
            })
            .catch(err => console.error(err))
    }

    const addTrainings = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {
                if (response.ok){
                    fetchTrainings();
                    setMsg('Training added successfully');
                    openSnackBar();
            }
                else
                    alert('Could not add a new training')
            })
            .catch(err => console.error(err))
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type': 'application/json' }

        })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                    setMsg('Customer edited successfully')
                    openSnackBar();
                }
                else
                    alert('Something went wrong in update');
            })

            .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'Delete' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer deleted successfully')
                        openSnackBar();
                        fetchCustomers();
                    }
                    else {
                        alert('Something went wrong')
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            width: 100,
            field: 'links.1.href',
            cellRendererFramework: params => < EditCustomer editCustomer={editCustomer} link={params.value} customer={params.data} />
        },
        {
            headerName: '',
            width: 100,
            field: 'links.1.href',
            cellRendererFramework: params =>
                <Tooltip title="Delete customer">
                    <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
        },

        {
            headerName: '',
            width: 100,
            field: 'links.1.href',
            cellRendererFramework: params =>
                < AddTrainings addTrainings={addTrainings} link={params.value} trainings={params.data2} />
        }

    ]


    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div id="myGrid" className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridReact
                    rowData={customer}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    message={msg}
                    onClose={closeSnackBar}
                />
            </div>
        </div>
    )

}

export default Customerlist;