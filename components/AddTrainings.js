import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';


function AddTrainings(props) {

    const [open, setOpen] = React.useState(false);
    //const [selectedDate, setSelectedDate] = useState(new Date());

    const [trainings, setTrainings] = useState({
        date: new Date(),
        duration: '',
        activity: '',
        customer: props.link
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTrainings(trainings);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTrainings({ ...trainings, [event.target.name]: event.target.value });
    }

    // useEffect(() => {
    //    setTrainings({ ...trainings, date: selectedDate.toDateString() });
    // }, [])

    return (
        <div>
            <Tooltip title="Add training">
                <IconButton color="primary" style={{ marginLeft: '10%', right: 3 }} variant="outlined" activity="primary" onClick={handleClickOpen}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        type= "datetime-local"
                        value={trainings.date}
                        name="date"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={trainings.duration}
                        name="duration"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={trainings.activity}
                        name="activity"
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        value={trainings.customer}
                        name="link"
                        onChange={inputChanged}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
          </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );



}

export default AddTrainings;