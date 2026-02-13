import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function linkClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium transition ${
    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
  }`;
}