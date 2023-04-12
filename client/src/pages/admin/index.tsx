import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { Route, Link, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Badge from '@mui/material/Badge';
import { fetchAllUser, deleteUser, updateUser } from "../../api";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const useStyles: any = makeStyles((theme) => ({
  tableHead: {
      borderBottomStyle: "solid",
      borderBottomColor: "blue"
  },
  stickyHeader:{
      borderCollapse:'collapse'
  }
}));

const Admin = () => {
  const [initialList, setInitialList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
    password: '',
    rollno: 0,
    _id: ''
  });
  const handleOpen = async (val) => {
    let tmp = initialList.find(element => element._id === val);
    setUserData({...tmp})
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const value = useMemo(async () => {
    const data: any = await fetchAllUser();
    setInitialList(data);    
    return data;
  },[fetchAllUser]);
  const handleClick = async (e) => {
    const rst: any = await deleteUser(e);
    if(rst) setInitialList(rst);
  }
  const handleChangeInput = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const handleChangeRoll = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    let returnVal: any = await updateUser(userData);
    if(returnVal) setInitialList(returnVal);
    setOpen(false);
  }

    return (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              > 
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Blog
              </Typography>
              <Button variant="contained" className="color-white"><Link to={"/signin"} className="signout">Sign Out</Link></Button>
            </Toolbar>
          </AppBar>

          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead classes={{ root: useStyles.classes }}>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Roll</TableCell>
            <TableCell>Setting</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='text-center'>
          { initialList.length > 0 ? initialList.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {++index}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge 
                  badgeContent={row.rollno === 2 ? 'ADMIN' : row.rollno === 1 ? 'MOD' : 'USER'} color="secondary">
                </Badge>
              </TableCell>
              <TableCell>
                <FaPen 
                  size={22} 
                  color="#1d7bc2"
                  style={{
                    marginRight: "10px",
                    cursor:"pointer"
                  }}
                  onClick={() => handleOpen(row._id)}
                />
                <FaTrash
                  size={22} 
                  color="#f00"
                  style={{
                    cursor:"pointer"
                  }}
                  onClick={() => handleClick(row._id)}
                />
              </TableCell>
            </TableRow>
          )) :null}
        </TableBody>
      </Table>
    </TableContainer>

    <div className="top-row p-5">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Card sx={style}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Edit User Info
              </Typography>
              <div className="form-group modal-form-group">
                <label className="control-label col-sm-2" htmlFor="title">Name:</label>
                <div className="col-sm-4 pr-3">
                  <input 
                    type="title"
                    className="form-control" 
                    name="name" 
                    value={userData.name}
                    placeholder="Enter Name"
                    onChange={handleChangeInput} 
                  />
                </div>
                <label className="control-label col-sm-2 pl-3" htmlFor="email">Email:</label>
                <div className="col-sm-4">
                  <input 
                    type="email"
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={userData.email}
                    placeholder="Enter Email"
                    onChange={handleChangeInput} 
                  />
                </div>
              </div>
              <div className="form-group modal-form-group mt-5">
                <label className="control-label col-sm-2" htmlFor="password">Password:</label>
                <div className="col-sm-4">
                  <input 
                    type="title"
                    className="form-control" 
                    id="password" 
                    name="password"
                    value={userData.password}
                    placeholder="Enter Name"
                    onChange={handleChangeInput} 
                  />
                </div>
                <label className="control-label col-sm-2 pl-3" htmlFor="email">Roll:</label>
                <div className="col-sm-4">
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="category-label">Roll</InputLabel>
                    <Select
                      labelId="category-label"
                      id="rollno"
                      name="rollno"
                      label="rollno"
                      value={userData.rollno}
                      onChange={handleChangeRoll}
                    >
                      <MenuItem value={1}>MOD</MenuItem>
                      <MenuItem value={0}>USER</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </CardContent>
            <CardActions className="justify-content-end">
              <Button size="small" onClick={handleUpdate}>Update</Button>
              <Button size="small" onClick={handleClose}>Cancel</Button>
            </CardActions>
          </Card>
          </Modal>
        </div>
        </>
    )
}

export default Admin;

