import { createBrowserRouter, useNavigate } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Tutorial_Page from "./components/home/Tutorial_Page";
import TutorialVideo from "./components/home/TutorialVideo";
import { ContactSupportPage } from "./components/home/ContactSupportPage";
import { Checkout } from "./components/home/Checkout";
import { Success } from "./components/home/Success";
import ForgotPassword from "./components/home/ForgotPassword";
import ResetPassword from "./components/home/ResetPassword";

function ContactPage() {
  const navigate = useNavigate();
  return (
    <ContactSupportPage
      onBack={(scrollTo?: string) => {
        if (scrollTo) sessionStorage.setItem("scrollTo", scrollTo);
        navigate("/");
      }}
    />
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "partners", Component: Partners },
      {
        path: "contact",
        Component: ContactPage,
      },
    ],
  },
  {
    path: "/tutorials",
    Component: Tutorial_Page,
  },
  {
    path: "/payment-success",
    Component: Success,
  },
  {
    path: "/checkout",
    Component: () => (
      <Checkout
        isOpen={true}
        onClose={() => window.history.back()}
      />
    ),
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
   {
    path: "/reset-password",
    Component: ResetPassword,
  },
]);