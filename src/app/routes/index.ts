import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";
import { categoryRoutes } from "../modules/categories/categories.routes";
import { productRoutes } from "../modules/product/product.routes";
import { attributeOptionRoutes } from "../modules/attributeOption/attributeOption.routes";
import { attributeRoutes } from "../modules/attribute/attribute.routes";


const router = Router();

const moduleRoutes = [
  
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/attributeOption",
    route: attributeOptionRoutes,
  },
  {
    path: "/attribute",
    route: attributeRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
