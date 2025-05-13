import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CircleDotLoader from "./CircleDotLoader";

const ProtectedAdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userDataString = sessionStorage.getItem("user");

        console.log("Retrieved token:", token);
        console.log("Retrieved user data string:", userDataString);

        if (!token || !userDataString) {
          throw new Error("No authentication data");
        }

        const userData = JSON.parse(userDataString);
        console.log("Parsed user data:", userData);

        // Check user role and status from stored data
        // Status can be 1 (Active) or "Active"
        if (
          userData.user_role == 1 &&
          (userData.status == 1 || userData.status == "Active")
        ) {
          console.log("User authenticated successfully");
          setIsAuthenticated(true);
        } else {
          console.log("User role:", userData.user_role);
          console.log("User status:", userData.status);
          throw new Error("Unauthorized access");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/adminLogin");
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
