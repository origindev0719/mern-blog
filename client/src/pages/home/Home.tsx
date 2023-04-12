import React, { Suspense, useContext, useEffect, useMemo } from "react";
import { Route, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoAddOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { SlFolder } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchAllData, createBlog } from "../../api";
import './style.css'
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

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [filename, setFilename] = React.useState('')
  const [initialList, setInitialList] = React.useState([]);
  const [data, setData] = React.useState({
    title: '',
    description: '',
    date: '',
    category: '',
    img: '',
    comment_count: 0,
    user_id: JSON.parse(sessionStorage.getItem('token'))._id ? JSON.parse(sessionStorage.getItem('token'))._id : null
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [event.target.id]: event.target.value});
  }
  const handleDate = (val) => {
    setData({...data, date: `${val.$M + 1}/${val.$D}/${val.$y}`})
  }
  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({...data, [event.target.id]: event.target.value});
  }
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    setData({...data, [event.target.name]: event.target.value});
  };
  const handleFileupload = (event: React.ChangeEvent<HTMLInputElement>) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      if(file.type === 'image/png' || file.type === 'image/jpeg') {
        setFilename(reader.result as string);
        setData({...data, [event.target.id]: reader.result as string});
      }
    }
    if (file) {
        reader.readAsDataURL(file);
    }
  }
  
  useMemo(async () => {
    const data: any = await fetchAllData();
    setInitialList(data)
    return data;
  },[]);

  const handleSubmit = async () => {
    const returnVal: any =  await createBlog(data);
    if(returnVal) {
      setInitialList(returnVal)
      setOpen(false);
    }
  }

  return (
    <>
      <div className="pb-4">
        <Suspense fallback={<div>...</div>}>
        <div className="navbar fixed-top">
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
          
        </div>
        <div className="top-row p-5">
          <Button variant="contained" className="ml-4" onClick={handleOpen}>
              <IoAddOutline />Add Blog
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Card sx={style}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add Blog
              </Typography>
              <div className="form-group modal-form-group">
                <label className="control-label col-sm-2" htmlFor="title">Title:</label>
                <div className="col-sm-10">
                  <input 
                    type="title"
                    className="form-control" 
                    id="title" 
                    placeholder="Enter Title"
                    onChange={handleChangeInput} 
                  />
                </div>
              </div>
              <div className="modal-description mt-3">
                <div className="form-outline">
                  <label className="form-label" htmlFor="textAreaExample">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    onChange={handleChangeTextarea}
                    rows={5}
                  ></textarea>
                </div>
              </div>
              <div className="date-category mt-3">
                <Button
                  variant="contained"
                  component="label">
                  Upload File
                  <input
                    type="file"
                    id="img"
                    onChange={handleFileupload}
                    hidden
                  />
                </Button>
                <img className="preview-image" src={filename} />
                <FormControl sx={{ minWidth: '30%' }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={age}
                    label="Age"
                    onChange={handleChangeCategory}>
                    <MenuItem value={'Taravel'}>Taravel</MenuItem>
                    <MenuItem value={'Development'}>Development</MenuItem>
                    <MenuItem value={'Working'}>Working</MenuItem>
                  </Select>
                </FormControl>
                <div className="date-picker-container">
                  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ minWidth: '60%' }}>
                    <DatePicker onChange={(e) => handleDate(e)} />
                  </LocalizationProvider>
                </div>
              </div>
            </CardContent>
            <CardActions className="justify-content-end">
              <Button size="small" onClick={handleSubmit}>Save</Button>
              <Button size="small" onClick={handleClose}>Cancel</Button>
            </CardActions>
          </Card>
          </Modal>
        </div>
        <div className="blog-list-container container">
          { 
            initialList ? initialList.map((rst, _res) => 
            <div className="blog-list" key={_res}>
              <div className="blog-img">
                {rst.img?<img src={ rst.img } />:null}
              </div>
              <div className="blog-content">
                <h1>{rst.title}</h1>
                <div className="sublist">
                  <div className="date d-flex align-items-sm-center">
                    <SlCalender className="ml-10" />
                    <span>{rst.date}</span>
                  </div>
                  <div className="category d-flex align-items-sm-center mr-20">
                    <SlFolder /><span>{rst.category}</span>
                  </div>
                  <div className="comment d-flex align-items-sm-center mr-10">
                    <FaRegCommentAlt /><span>{rst.comment_count}</span>
                  </div>
                </div>
                <div className="blog-description pt-10">
                  <span className="mt-10">{rst.description}</span>
                  <Link to="/viewBlog" state={{ ...rst }} className="read-more">
                    Read More<FaAngleRight />
                  </Link>
                </div>
              </div>
            </div>) : null}
        </div>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
