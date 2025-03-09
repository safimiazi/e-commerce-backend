import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import { homeBannerRoutes } from "../modules/home_banner/home_banner.routes";
import { homeAboutRoutes } from "../modules/home_about/home_about.routes";
import { ServicesRoutes } from "../modules/home_services/home_services.routes";
import { SectionHeaderRoutes } from "../modules/section_header/section_header.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { CaseStudyRoutes } from "../modules/case_study/case_study.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/home_banner",
    route: homeBannerRoutes,
  },
  {
    path: "/home_about",
    route: homeAboutRoutes,
  },
  {
    path: "/services",
    route: ServicesRoutes,
  },
  {
    path: "/project",
    route: projectRoutes,
  },
  {
    path: "/case_study",
    route: CaseStudyRoutes,
  },
  {
    path: "/section_header",
    route: SectionHeaderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
