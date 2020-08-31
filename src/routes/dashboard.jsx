import Dashboard from "views/Dashboard/Dashboard.jsx";
import About from "../views/About/About";
import Logout from "../layouts/Logout/Logout";
import CreateAdvert from "../views/CreateAdvert/CreateAdvert";
import ManageAdverts from "../views/ManageAdverts/ManageAdverts";
import Reports from "../views/Reports/Reports";
import CreditMarket from "../views/CreditMarket/CreditMarket";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-tachometer-alt",
    component: Dashboard
  },
  {
    path: "/credit",
    name: "Credit Market",
    icon: "fas fa-fill-drip",
    component: CreditMarket
  },
  {
    path: "/create",
    name: "Create Advert",
    icon: "fas fa-plus-square",
    component: CreateAdvert
  },
  {
    path: "/manage",
    name: "Manage Adverts",
    icon: "fas fa-dice-d20",
    component: ManageAdverts
  },
  {
    dynamic: true,
    path: "/reports/:advert_id",
    component: Reports
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "fas fa-chart-pie",
    component: Reports
  },
  {
    path: "/about",
    name: "About",
    icon: "fas fa-bell",
    component: About
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "fas fa-sign-out-alt",
    component: Logout
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
