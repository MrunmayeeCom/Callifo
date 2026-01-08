import { useEffect, useState } from "react";
import CallifoAPI from "../api/callifoapi";

export default function AdminDashboard() {
  const [sims, setSims] = useState([]);
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    CallifoAPI.get("/api/sims/").then(res => setSims(res.data));
    CallifoAPI.get("/api/calls/").then(res => setCalls(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>SIMs</h2>
      <pre>{JSON.stringify(sims, null, 2)}</pre>

      <h2>Calls</h2>
      <pre>{JSON.stringify(calls, null, 2)}</pre>
    </div>
  );
}
