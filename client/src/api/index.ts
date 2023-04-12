import { ICart, IProduct, User, Blog, Comment, BlogComment } from "../types";

const api = "http://localhost:3001/api"; /* Node */
 

const createProduct = async (product: IProduct): Promise<IProduct[]> => {
  const response = await fetch(`${api}/`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(product),
  });
  const products = await response.json();

  return products;
}

const checkout = async (carts: ICart[]): Promise<IProduct[]> => {
  const response = await fetch(`${api}/checkout`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({carts}),
  });
  const products = await response.json();
  return products;
}

const signup = async (user: User): Promise<User> => {
  const req = user.email === 'cnr0719@gmail.com' && user.name === 'cnr' ? 2 : 0;
  const sendData = {...user, rollno: req}
  const response = await fetch(`${api}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(
      { sendData }
      ),
  });
  const users = await response.json();
  return users;
}

const signin = async (user: User): Promise<User> => {
  const response = await fetch(`${api}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({user}),
  });
  const users = await response.json();
  return users;
}

const fetchAllData = async (): Promise<Blog> => {
  try {
    const response = await fetch(`${api}/getBlog`);
    const blogs = await response.json();
    return blogs;
  } catch(err) {
    console.log(err)
  }
}

const createBlog = async (blog: Blog): Promise<Blog> => {
  const response = await fetch(`${api}/createBlog`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({blog}),
  });
  const blogs = await response.json();
  return blogs;
}

const deleteBlog = async (blog: Blog): Promise<Blog> => {
  const response = await fetch(`${api}/deleteBlog/${blog}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });
  const blogs = await response.json();
  return blogs;
}

const createComment = async (blog: Comment): Promise<Blog> => {
  const response = await fetch(`${api}/createComment`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({blog}),
  });
  const blogs = await response.json();
  return blogs;
}

const updateBlog = async (blog: BlogComment): Promise<BlogComment> => {
  const response = await fetch(`${api}/updateBlog`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({blog}),
  });
  const blogs = await response.json();
  return blogs;
}

const fetchAllUser = async (): Promise<User> => {
  const response = await fetch(`${api}/getAllUser`);
  const users = await response.json();
  return users;
}

const deleteUser = async (user: User): Promise<User> => {
  const response = await fetch(`${api}/deleteUser/${user}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });
  const users = await response.json();
  return users;
}

const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`${api}/updateUser`, {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({user}),
  });
  const users = await response.json();
  return users;
}
export { 
        createProduct, 
        checkout, 
        signup, 
        signin,
        fetchAllData, 
        createBlog,
        deleteBlog,
        createComment,
        updateBlog,
        fetchAllUser,
        deleteUser,
        updateUser
      };
