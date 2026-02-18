import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Briefcase,
  FileText,
  LogOut,
  LayoutDashboard,
  Users,
  FileStack,
  GraduationCap } from
'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
export function Layout({ children }: {children: React.ReactNode;}) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Define navigation based on roles
  const getNavLinks = () => {
    if (!user) {
      return [
      {
        name: 'Home',
        href: '/',
        icon: LayoutDashboard
      },
      {
        name: 'Jobs',
        href: '/jobs',
        icon: Briefcase
      }];

    }
    switch (user.role) {
      case 'admin':
        return [
        {
          name: 'Dashboard',
          href: '/admin',
          icon: LayoutDashboard
        },
        {
          name: 'Users',
          href: '/admin/users',
          icon: Users
        },
        {
          name: 'Jobs',
          href: '/admin/jobs',
          icon: Briefcase
        },
        {
          name: 'Proposals',
          href: '/admin/proposals',
          icon: FileStack
        }];

      case 'client':
        return [
        {
          name: 'Dashboard',
          href: '/client-dashboard',
          icon: LayoutDashboard
        },
        {
          name: 'My Jobs',
          href: '/client-dashboard',
          icon: Briefcase
        },
        {
          name: 'Contracts',
          href: '/contracts',
          icon: FileText
        }];

      case 'freelancer':
        return [
        {
          name: 'Dashboard',
          href: '/freelancer-dashboard',
          icon: LayoutDashboard
        },
        {
          name: 'Browse Jobs',
          href: '/jobs',
          icon: Briefcase
        },
        {
          name: 'Contracts',
          href: '/contracts',
          icon: FileText
        }];

      default:
        return [];
    }
  };
  const navLinks = getNavLinks();
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  UniFreelancer
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>

                      {link.name}
                    </Link>);

                })}
              </nav>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ?
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-blue-600 uppercase tracking-wider font-bold">
                      {user.role}
                    </p>
                  </div>
                  <img
                  className="h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover"
                  src={user.avatar}
                  alt={user.name} />

                  <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Log out">

                    <LogOut className="h-5 w-5" />
                  </button>
                </div> :

              <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              }
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100">

                {isMobileMenuOpen ?
                <X className="block h-6 w-6" /> :

                <Menu className="block h-6 w-6" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen &&
        <div className="md:hidden bg-white border-t border-slate-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}>

                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5 text-slate-400" />
                    {link.name}
                  </div>
                </Link>
            )}
            </div>
            {user ?
          <div className="pt-4 pb-4 border-t border-slate-200 px-4">
                <div className="flex items-center gap-3">
                  <img
                className="h-10 w-10 rounded-full"
                src={user.avatar}
                alt={user.name} />

                  <div>
                    <div className="text-base font-medium text-slate-900">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-blue-600 uppercase">
                      {user.role}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}>

                    Log Out
                  </Button>
                </div>
              </div> :

          <div className="pt-4 pb-4 border-t border-slate-200 px-4 space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center">Sign Up</Button>
                </Link>
              </div>
          }
          </div>
        }
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>);

}