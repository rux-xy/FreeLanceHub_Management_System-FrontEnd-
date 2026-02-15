import React, { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useScrollProgress } from "../../hooks/useScrollProgress";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}
function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Apple-ish nav:
 * - Top: clean text buttons
 * - Scrolled: pills + stronger contrast
 */
function navItemClass(isActive: boolean, mode: "top" | "scrolled") {
  const base =
    "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium " +
    "transition-all duration-200 ease-out select-none";

  if (mode === "top") {
    return cx(
      base,
      "text-black/80 hover:text-black hover:bg-black/5",
      isActive && "text-black bg-black/10",
    );
  }

  return cx(
    base,
    "text-black/80 hover:text-black hover:bg-black/5",
    isActive && "bg-black text-white shadow-sm",
  );
}

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // 0 at top, 1 after 220px scroll
  const p = useScrollProgress(220);
  const t = clamp01(p);

  // ✅ You asked: top text should be BLACK
  const mode: "top" | "scrolled" = t < 0.2 ? "top" : "scrolled";

  /**
   * Header morph:
   * transparent -> white/blur, subtle border/shadow
   */
  const headerStyle = useMemo(() => {
    const bgAlpha = lerp(0.0, 0.78, t);
    const borderAlpha = lerp(0.0, 0.12, t);
    const shadowAlpha = lerp(0.0, 0.14, t);

    return {
      backgroundColor: `rgba(255,255,255,${bgAlpha})`,
      borderColor: `rgba(0,0,0,${borderAlpha})`,
      boxShadow: `0 10px 30px rgba(0,0,0,${shadowAlpha})`,
      backdropFilter: t > 0.02 ? "blur(16px)" : "none",
      WebkitBackdropFilter: t > 0.02 ? "blur(16px)" : "none",
      transition:
        "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
    } as React.CSSProperties;
  }, [t]);

  /**
   * ✅ Spread animation (HOME ONLY):
   * - At top: constrained/centered
   * - On scroll: expands to full width (ends of the screen)
   */
  const innerClass = useMemo(() => {
    // top = centered + tighter width
    // scrolled = full width
    if (!isHome) return "container h-16 flex items-center justify-between";

    return cx(
      "mx-auto h-16 flex items-center justify-between transition-all duration-300 ease-out",
      // This is the “spread”: max-w grows to full width
      t < 0.2 ? "max-w-5xl" : "max-w-none w-full",
    );
  }, [isHome, t]);

  // Padding grows slightly as it spreads
  const innerStyle = useMemo(() => {
    if (!isHome) return undefined;
    const px = lerp(24, 48, t); // 24px -> 48px
    return { paddingLeft: px, paddingRight: px } as React.CSSProperties;
  }, [isHome, t]);

  return (
    <>
      <header
        className={cx("fixed top-0 left-0 right-0 z-50 border-b")}
        style={headerStyle}
      >
        <div className={innerClass} style={innerStyle}>
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl grid place-items-center border bg-black/5 border-black/10">
              <span className="text-sm font-extrabold text-black">FH</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-black">
              FreelanceHub
            </span>
          </NavLink>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) => navItemClass(isActive, mode)}
            >
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => navItemClass(isActive, mode)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => navItemClass(isActive, mode)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  end
                  className={({ isActive }) => navItemClass(isActive, mode)}
                >
                  Jobs
                </NavLink>

                {user.role === "client" && (
                  <NavLink
                    to="/jobs/create"
                    className={({ isActive }) => navItemClass(isActive, mode)}
                  >
                    Create Job
                  </NavLink>
                )}

                <NavLink
                  to="/contracts"
                  className={({ isActive }) => navItemClass(isActive, mode)}
                >
                  Contracts
                </NavLink>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="ml-1 rounded-full px-3 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-black/5 transition"
                  >
                    Admin
                  </Link>
                )}

                <NavLink
                  to="/profile"
                  className={({ isActive }) => navItemClass(isActive, mode)}
                >
                  Profile
                </NavLink>

                {/* User chip */}
                <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-black/10">
                  <div className="h-9 w-9 rounded-xl bg-black/5 border border-black/10 grid place-items-center">
                    <span className="text-xs font-bold text-black">
                      {user.name?.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-black">
                      {user.name}
                    </p>
                    <p className="text-xs text-black/60">{user.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={logout}
                    className="ml-2 rounded-full px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90 transition"
                  >
                    Logout
                  </button>
                </div>

                {/* Mobile logout */}
                <button
                  type="button"
                  onClick={logout}
                  className="sm:hidden rounded-full px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Spacer so content starts below fixed header */}
      <div className="h-16" />
    </>
  );
}
