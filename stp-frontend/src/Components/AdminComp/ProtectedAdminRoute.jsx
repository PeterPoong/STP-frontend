import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CircleDotLoader from './CircleDotLoader';

const ProtectedAdminRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyAdmin = async () => {
            const token = sessionStorage.getItem('token');
            const userData = JSON.parse(sessionStorage.getItem('user')); // Get stored user data
            
            if (!token || !userData) {
                setIsLoading(false);
                navigate('/adminLogin');
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/adminList`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                
                // Find the current user in the admin list
                const currentUser = data.data.find(admin => 
                    admin.email === userData.email && 
                    admin.contact_no === userData.contact_no
                );

                // Verify if user exists and has correct role and active status
                if (currentUser && 
                    currentUser.user_role === 1 && 
                    currentUser.status === "Active") {
                    setIsAuthenticated(true);
                } else {
                    console.log('Unauthorized access attempt');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                    navigate('/adminLogin');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                navigate('/adminLogin');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAdmin();
    }, [navigate]);

    if (isLoading) {
        return <CircleDotLoader />;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedAdminRoute;