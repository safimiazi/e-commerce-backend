import { Router } from "express";
import { userRoutes } from "../modules/users/users.routes";
import { categoryRoutes } from "../modules/categories/categories.routes";


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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
