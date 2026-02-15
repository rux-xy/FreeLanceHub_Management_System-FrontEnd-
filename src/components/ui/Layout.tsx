import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-100 text-zinc-900">
      
      {/* TOP-LEFT INTENSE TECH GLOW */}
      <div className="pointer-events-none absolute -top-72 -left-72 h-[60rem] w-[60rem] rounded-full bg-indigo-600/55 blur-[220px]" />

      {/* BOTTOM-RIGHT INTENSE TECH GLOW */}
      <div className="pointer-events-none absolute -bottom-80 -right-80 h-[64rem] w-[64rem] rounded-full bg-cyan-500/50 blur-[240px]" />

      {/* Stronger radial mesh spread */}
      <div className="pointer-events-none absolute inset-0 
        bg-[radial-gradient(1300px_700px_at_5%_0%,rgba(79,70,229,0.20),transparent_60%),
             radial-gradient(1300px_700px_at_95%_100%,rgba(6,182,212,0.20),transparent_65%)]" />

      <Header />

      <main className="container py-8 relative">
        <Outlet />
      </main>
    </div>
  );
}
