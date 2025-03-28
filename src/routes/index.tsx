import { createBrowserRouter, useNavigate } from "react-router-dom";
import { ROUTES } from "../lib/consts";
import LoginPage from "../pages/loginPage/LoginPage";
import ApprovedSection from "../pages/dashboardPage/sections/approved/ApprovedSection";
import RejectedSection from "../pages/dashboardPage/sections/rejected/RejectedSection";
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import PendingSection from "../pages/dashboardPage/sections/pending/PendingSection";
import ErrorPage from "../components/error/ErrorPage";
import PrivateRoute from "../helpers/PrivateRoute";
import WinnerSection from "../pages/dashboardPage/sections/winner/WinnerSection";

const router = createBrowserRouter(
  [
    {
      path: ROUTES.LOGIN,
      element: <LoginPage />,
    },
    {
      path: ROUTES.DASHBOARD,
      element: (
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <PendingSection />,
        },
        {
          path: ROUTES.PENDING,
          element: <PendingSection />,
        },
        {
          path: ROUTES.APPROVED,
          element: <ApprovedSection />,
        },
        {
          path: ROUTES.REJECTED,
          element: <RejectedSection />,
        },
        // {
        //     path: ROUTES.WINNER,
        //     element: (<WinnerSection/>),
        // },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ],
  // { basename: "/dabur/dabur_dashboard_ui/" }
  { basename: "/Hershey-dashboard" }
);

export default router;
