import { Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IoAddOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { SlFolder } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { deleteBlog, createComment, updateBlog, fetchAllUser } from "../../api";
import "./style.css";
import dayjs from "dayjs";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ViewBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [viewComment, setViewComment] = useState(location.state);
  const [filename, setFilename] = React.useState("");
  const [comment, setComment] = useState({ name: "", email: "", message: "" });
  const [initialList, setInitialList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({
    _id: viewComment._id,
    title: viewComment.title,
    description: viewComment.description,
    date: viewComment.date,
    category: viewComment.category,
    img: viewComment.img,
    comment_count: viewComment.comment_count,
    user_id: JSON.parse(sessionStorage.getItem("token"))._id
      ? JSON.parse(sessionStorage.getItem("token"))._id
      : null,
  });
  // const value = useMemo(async () => {
  //   const data: any = await fetchAllUser();
  //   setInitialList(data); 
  //   data.find(ele=>(ele._id === location.state.user_id&&ele.rollno === 0)) ? setFlag(true) : setFlag(false);
  //   console.log(data.find(ele=>(ele._id === location.state.user_id&&ele.rollno === 0)))
    
  //   data.find(ele=>(ele._id === location.state.user_id&&ele.rollno === 1)) ? 
  //   actions.push({ icon: <FaPen />, name: "Edit" },
  //   { icon: <FaTrash />, name: "Delete" },
  //   { icon: <FaUndoAlt />, name: "Back" },) :
  //   actions.push({ icon: <FaUndoAlt />, name: "Back" })
  //   return data;
  // },[fetchAllUser]);
  
  
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data: any = await fetchAllUser();
      data.find(ele=>(ele._id === location.state.user_id&&ele.rollno === 1)) ? 
      setFlag(true) : setFlag(false);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  console.log(flag)
  

  const actions = flag ? [
    { icon: <FaPen />, name: "Edit" },
    { icon: <FaTrash />, name: "Delete" },
    { icon: <FaUndoAlt />, name: "Back" },
  ] :  [
    { icon: <FaUndoAlt />, name: "Back" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeInput = (e) => {
    let temp = e.target.id;
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleFileupload = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setFilename(reader.result as string);
        setData({ ...data, [event.target.id]: reader.result as string });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleChangeCategory = (event) => {
    setAge(event.target.value as string);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleClick = async (e) => {
    if (e === "Delete") {
      const returnVal: any = await deleteBlog(viewComment._id);
      if (returnVal === "success") navigate("/home");
    } else if (e === "Back") {
      navigate("/home");
    } else if (e === "Edit") {
      handleOpen();
    }
  };
  const handleDate = (val) => {
    setData({ ...data, date: `${val.$M + 1}/${val.$D}/${val.$y}` });
  };
  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const returnVal = await createComment({
      ...comment,
      blog_id: viewComment._id,
    });
    console.log(returnVal);
    if (typeof returnVal === "object") {
      setViewComment(returnVal);
      setData({ ...data, comment_count: returnVal.comment_count });
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    let rst = await updateBlog(data);
    if (rst) handleClose();
  };

  return (
    <>
      <div className="view-detail-container">
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
              <Button variant="contained" className="color-white">
                <Link to={"/signin"} className="signout">
                  Sign Out
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className="top-row detail-show  w-75">
          <Typography
            className="text-center"
            variant="h2"
            component="div"
            sx={{ flexGrow: 1 }}
          >
          </Typography>
          <Box
            className="speed-dial"
            sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
          >
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              direction="down"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={() => {
                    handleClick(action.name);
                  }}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </Box>
          <div className="sublist justify-content-end pt-4">
            <div className="date d-flex align-items-sm-center">
              <SlCalender className="ml-10" />
              <span>{data.date}</span>
            </div>
            <div className="category d-flex align-items-sm-center mr-10">
              <SlFolder />
              <span>{data.category}</span>
            </div>
            <div className="comment d-flex align-items-sm-center mr-10">
              <FaRegCommentAlt />
              <span>{data.comment_count}</span>
            </div>
          </div>
          <div className="text-center p-4">
            <img src={data.img} />
          </div>
          <Typography
            className="text-left mb-5"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {data.description}
          </Typography>

          {viewComment.comment.map((val, key) => (
            <div className="comments-list-container p-4" key={key}>
              <div className="user-info">
                <span>ID: {val._id}</span>
                <span>{new Date(val.timestamp).toLocaleString()}</span>
              </div>
              <div>
                <Typography
                  className="text-left opacity-color"
                  variant="subtitle2"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {val.content}
                </Typography>
              </div>
            </div>
          ))}
          <div className="leave-comment-container pb-5">
            <form onSubmit={handleSubmit}>
              <Typography
                className="pt-5 pb-5"
                variant="h5"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Leave Comment
              </Typography>
              <Typography
                className=""
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Name*
              </Typography>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                className="form-control"
              />
              <Typography
                className="mt-3"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Email*
              </Typography>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                className="form-control"
              />
              <Typography
                className="mt-3"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Message
              </Typography>
              <textarea
                className="form-control mb-3"
                id="description"
                onChange={handleChange}
                name="message"
                rows={5}
              ></textarea>
              <Button type="submit" variant="outlined">
                Post Comment
              </Button>
            </form>
          </div>

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
                    Add Blog
                  </Typography>
                  <div className="form-group modal-form-group">
                    <label className="control-label col-sm-2" htmlFor="title">
                      Title:
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="title"
                        className="form-control"
                        id="title"
                        value={data.title}
                        placeholder="Enter Title"
                        onChange={(e) => handleChangeInput(e)}
                      />
                    </div>
                  </div>
                  <div className="modal-description mt-3">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="textAreaExample">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={data.description}
                        onChange={handleChangeInput}
                        rows={5}
                      ></textarea>
                    </div>
                  </div>
                  <div className="date-category mt-3">
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        id="img"
                        onChange={handleFileupload}
                        hidden
                      />
                    </Button>
                    <img className="preview-image" src={data.img} />
                    <FormControl sx={{ minWidth: "30%" }}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={data.category}
                        label="Age"
                        onChange={handleChangeCategory}
                      >
                        <MenuItem value={"Taravel"}>Taravel</MenuItem>
                        <MenuItem value={"Development"}>Development</MenuItem>
                        <MenuItem value={"Working"}>Working</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="date-picker-container">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ minWidth: "60%" }}
                      >
                        <DatePicker
                          value={dayjs(data.date)}
                          onChange={(e) => handleDate(e)}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </CardContent>
                <CardActions className="justify-content-end">
                  <Button size="small" onClick={handleUpdate}>
                    Update
                  </Button>
                  <Button size="small" onClick={handleClose}>
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
