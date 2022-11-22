
// All imports
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// components imports
import TableData from './tables';


//mui imports
import {Box,Button,Typography,TextField,Grid,Modal} from '@mui/material/';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CreateTable = () => {
              // All states
    const [post, setPost] = useState({ first_name: "", last_name: "", email: "", phone_no: "",});
    const [userData, setUserData] = useState([]);
    const [update, setupdata] = useState({});
    const [userId, setUserId] = useState();
    const [search, setSearch] = useState("");
    
               // Upadate Model
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
                 // Delete Model
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const delHandleOpen = () => setDeleteOpen(true);
    const delHandleClose = () => setDeleteOpen(false);
    //post Model
    const [postOpen, setPostOpen] = React.useState(false);
    const postHandleOpen = () => setPostOpen(true);
    const postHandleClose = () => setPostOpen(false);

 
                      //posting functions
    
    const postHandleChange = (e) => {
        const { name, value } = e.target;
        setPost((val) => {
            return { ...val, [name]: value }
        });
    };
    const postData = (e) => {
        axios.post(`https://5f252b05c85de20016292e83.mockapi.io/api/v1/employee`, post)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        postHandleClose()
    };

   
                           // searching
    
    const searchMoives = async (name) => {
        axios.get(`https://5f252b05c85de20016292e83.mockapi.io/api/v1/employee?page=1&limit=5&sortBy=id&search=${name}`)
            .then((res) => { setUserData(res.data) })
            .catch(err => console.log(err));

        setSearch("");

    };
 
                         //Adding Deleting Functions

    const deleteData = (id) => {
        delHandleOpen();
        setUserId(id);
        
    };

    const removeData = () => {
        axios.delete(`https://5f252b05c85de20016292e83.mockapi.io/api/v1/employee/${userId}`)
        
    setUserData((val) => {
        return val.filter(item => { return item.id !== userId });
    });
        
        delHandleClose();
    }

                         //Adding Updating Functions
    const updateData = (data) => {
        handleOpen();
        setupdata(data)
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdata((val) => {
            return { ...val, [name]: value }
        })
    };
    const saveUpdateData = () => {
        axios.put(`https://5f252b05c85de20016292e83.mockapi.io/api/v1/employee/${update.id}`, update)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        handleClose();
        
    };
    
                        // Read all data from mockapi
    useEffect(() => {
        axios.get('https://5f252b05c85de20016292e83.mockapi.io/api/v1/employee')
            .then(res => setUserData(res.data))
            .catch(err => console.log(err));   
    },[]);

    return (
        <div>
            <h2>Manage Users</h2>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>     
                <Button onClick={postHandleOpen} variant="contained" >Adduser</Button>
                <div className='search'>
            <input type="text" value={search} placeholder='search' onChange={(e) => {setSearch(e.target.value)}} />
            <button type='button' alt="searchicon" onClick={() => {searchMoives(search)}}><SearchIcon/></button>
        </div>
            </Stack>
            <TableData userData={userData} deleteData={deleteData} updataData={updateData}/>    
          {/* update Model */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Edit user</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={update.first_name ? update.first_name : ""} autoComplete="given-name" name="first_name" required fullWidth id="firstName" label="first_name" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={handleChange} value={update.last_name ? update.last_name : ""} required fullWidth id="lastName" label="last_name" name="last_name" autoComplete="family-name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleChange} value={update.email ? update.email : ""} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleChange} value={update.phone_no ? update.phone_no : ""} required fullWidth name="phone_no" label="phone" type="number" id="number" autoComplete="phone" />
                            </Grid>
                        </Grid>
                        <div className='buttons' style={{ marginTop: "25px" }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} >
                                <Button onClick={() => handleClose()} type="submit" variant="contained" >cancel</Button>
                                <Button onClick={saveUpdateData} type="submit" variant="contained" >save</Button>
                            </Stack>
                        </div>
                    </Box>
          
                </Box>
            </Modal>
            {/* Delete Model */}
            <Modal
                open={deleteOpen}
                onClose={delHandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure? You want to delete this user.
                    </Typography>
                    <div className='buttons' style={{ marginTop: "25px" }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} >
                            <Button onClick={() => delHandleClose()} variant="outlined">cancel</Button>
                            <Button onClick={removeData} variant="contained" color="error">delete</Button>
                        </Stack>
                    </div>
                </Box>
            </Modal>
            {/* post Model */}
            <Modal open={postOpen} onClose={postHandleClose} aria-labelledby="modal-modal-title">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Add User</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={postHandleChange}  value={post.first_name} autoComplete="given-name" name="first_name" required fullWidth id="firstName" label="first_name" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={postHandleChange}  value={post.last_name} required fullWidth id="lastName" label="last_name" name="last_name" autoComplete="family-name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={postHandleChange} value={post.email}  required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={postHandleChange}  value={post.phone_no} required fullWidth name="phone_no" label="phone" type="number/text" id="number" autoComplete="phone" />
                            </Grid>
                        </Grid>
                        <div className='buttons' style={{ marginTop: "25px" }}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} >
                                <Button onClick={ ()=>postHandleClose()} variant="contained" >cancel</Button>
                                <Button onClick={postData}type="submit" variant="contained" >save</Button>
                            </Stack>
                        </div>
                    </Box>
          
                </Box>
            </Modal>
        </div>
    );
}

export default CreateTable