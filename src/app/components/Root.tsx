import { Outlet } from "react-router";
import { Header } from "./home/Header";
import { Footer } from "../components/home/Footer";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
