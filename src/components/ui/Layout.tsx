import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-zinc-100 text-zinc-900">
      {/* soft premium glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-28 -right-24 h-[26rem] w-[26rem] rounded-full bg-emerald-500/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-sky-500/8 blur-3xl" />

      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] [background-size:18px_18px] opacity-30" />

      <Header />

      <main className="container py-8 relative">
        <Outlet />
      </main>
    </div>
  );
}
