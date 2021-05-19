import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = React.useState(false);


    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'Delete' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training deleted successfully')
                        openSnackBar();
                        fetchTrainings();
                    }
                    else {
                        alert('Something went wrong')
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const columns = [
        { field: 'activity', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        {
            headerName: 'Customer', field: 'fullname', sortable: true, filter: true,
            valueGetter(params) {
                if (params.data.customer.firstname && params.data.customer.lastname)
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            }
        },
        {
            headerName: '',
            width: 100,
            field: 'id',
            cellRendererFramework: params =>
                <Tooltip title="Delete training">
                    <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
        },
    ]

    return (
        <div id="myGrid" className="ag-theme-alpine" style={{ height: 600 }}>
            <AgGridReact
                rowData={trainings}
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
    )

}

export default Trainings;