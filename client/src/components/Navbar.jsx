import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../api/users.api';

// Logotipo
import logoFreeRail from '../assets/logotipo-flipout.png'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/auth-status/`, { withCredentials: true });
                setIsAuthenticated(response.data.is_authenticated);
                if (response.data.is_authenticated) {
                    const userResponse = await axios.get(`${API_BASE_URL}/api/user/`, { withCredentials: true });
                    setUser(userResponse.data);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const currentPath = location.pathname;

    const renderAuthButtons = () => (
        <div className="flex items-center space-x-4">
            <NavLink
                to="/login"
                className="rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
                Entrar
            </NavLink>
            <NavLink
                to="/register"
                className="rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
                Registrarse
            </NavLink>
        </div>
    );

    const renderUserMenu = () => (
        <div className="relative">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full"
                    src={user?.profile_picture || "/placeholder-avatar.jpg"}
                    alt={user?.first_name}
                />
            </button>
            {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Perfil
                    </NavLink>
                    <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Ajustes
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <nav className="bg-[#101419] border-b-2 border-[#293038] w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 w-full mx-auto">
                <div className="flex items-center">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logoFreeRail} className="h-12" alt="FreeRail Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">FlipOut</span>
                    </NavLink>
                    <div className="hidden md:flex md:ml-6">
                        {currentPath !== '/' && !['/login', '/register'].includes(currentPath) && (
                            <NavLink
                                to="/"
                                className="rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Inicio
                            </NavLink>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    {isAuthenticated ? renderUserMenu() : renderAuthButtons()}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-2"
                        aria-controls="navbar-user"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden" id="navbar-user">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {currentPath !== '/' && !['/login', '/register'].includes(currentPath) && (
                            <NavLink
                                to="/"
                                className="block rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Inicio
                            </NavLink>
                        )}
                        {!isAuthenticated && (
                            <>
                                <NavLink
                                    to="/login"
                                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Entrar
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Registrarse
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;