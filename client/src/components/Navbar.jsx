import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../api/users.api';

// Logotipo
import logoFreeRail from '../assets/logotipo-flipout.png'

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth-status/', { withCredentials: true });
                setIsAuthenticated(response.data.is_authenticated);
                if (response.data.is_authenticated) {
                    const userResponse = await axios.get('http://localhost:8000/api/user/', { withCredentials: true });
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
            localStorage.removeItem('user');  // Si estás almacenando información del usuario en localStorage
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Obtener el pathname actual
    const currentPath = location.pathname;

    return (
        <nav className="bg-[#101419] border-b-2 border-[#293038] w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4 w-full mx-auto">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logoFreeRail} className="h-12" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Flowbite</span>
                </NavLink>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {isAuthenticated ? (
                        <>
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                                id="user-menu-button"
                                aria-expanded="false"
                                data-dropdown-toggle="user-dropdown"
                                data-dropdown-placement="bottom"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                            </button>
                            <div
                                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">{user ? user.first_name : 'Usuario'}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Perfil
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Ajustes
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        !['/login', '/register'].includes(currentPath) && (
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
                        )
                    )}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-user"
                        aria-expanded="false"
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
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {!['/login', '/register'].includes(currentPath) && (
                            <>
                                <li>
                                    {currentPath !== '/' && (
                                        <NavLink
                                            to="/"
                                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                        >
                                            Inicio
                                        </NavLink>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
