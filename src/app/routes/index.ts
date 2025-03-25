import { Router } from "express";
import { categoryRoutes } from "../modules/categories/categories.routes";
import { attributeOptionRoutes } from "../modules/attributeOption/attributeOption.routes";
import { attributeRoutes } from "../modules/attribute/attribute.routes";
import { brandRoutes } from "../modules/brand/brand.routes";
import { unitRoutes } from "../modules/unit/unit.routes";
import { productRoutes } from "../modules/product/product.routes";
import { wishlistRoutes } from "../modules/wishlist/wishlist.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { cartRoutes } from "../modules/cart/cart.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: usersRoutes,
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
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/wishlist",
    route: wishlistRoutes,
  },

  {
    path: "/unit",
    route: unitRoutes,
  },
  {
    path: "/brand",
    route: brandRoutes,
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
