import { Router } from "express";
import * as ProductController from "../controllers/productController";
import * as UserController from "../controllers/userController";
import * as BlogController from "../controllers/blogController";

const router = Router();

router.get("/", ProductController.product_index);
router.post("/", ProductController.product_create);
router.post("/checkout", ProductController.product_checkout);
router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get("/getBlog", BlogController.getBlog);
router.get("/getAllUser", UserController.getAllUser);
router.post("/createBlog", BlogController.createBlog);
router.get("/deleteBlog/(:id)", BlogController.deleteBlog);
router.post("/createComment", BlogController.createComment);
router.post("/updateBlog", BlogController.updateBlog);
router.get("/deleteUser/(:id)", UserController.deleteUser);
router.post("/updateUser", UserController.updateUser);


export default router;
