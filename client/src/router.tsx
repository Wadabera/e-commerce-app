import { createBrowserRouter } from "react-router-dom";
import { CustomerLayout } from "./components/layout/CustomerLayout";
import { StoreHome } from "./pages/customer/Home";
import { PublicOnlyLayout } from "./components/auth/PublicOnlyLayout";
import { UnifiedLoginPage } from "./pages/auth/UnifiedLogin";
import { SignUpPage } from "./pages/auth/Sign-up";
import { ProtectedLayout } from "./components/auth/ProtectedLayout";
import { AdminGuard } from "./components/auth/AdminGuard";
import { AdminLayout } from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCoupons from "./pages/admin/Promos";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";
import Collections from "./pages/customer/Collections";
import CollectionDetails from "./pages/customer/Collection-Details";
import CustomerOrderSuccessPage from "./pages/customer/Order-Sucess";
import { TestPage } from "./pages/TestPage";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <StoreHome />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "sign-in",
            element: <UnifiedLoginPage />,
          },
          {
            path: "sign-up/*",
            element: <SignUpPage />,
          },
          {
            path: "collections",
            element: <Collections />,
          },
          {
            path: "collection/:id",
            element: <CollectionDetails />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "order-success",
            element: <CustomerOrderSuccessPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminGuard />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,

        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "coupons",
            element: <AdminCoupons />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
]);
