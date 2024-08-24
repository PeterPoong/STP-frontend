import { Navigate } from "react-router-dom";
import Sidebar from "../../Components/SchoolPortalComp/SchoolSidebar";
import { useEffect, useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
const SchoolDashboard = () => {
  const [schoolDetail, setSchoolDetail] = useState();
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/schoolPortalLogin" />;
  }
  useEffect(() => {
    const schoolDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/schoolDetail`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSchoolDetail(data);
      } catch (error) {
        console.error("Failed to fetch school details:", error);
      }
    };
    schoolDetail();
  }, [token]);

  if (!schoolDetail) {
    return <ArrowClockwise />;
  }

  console.log("response", schoolDetail);
  console.log("token", token);
  return (
    <>
      <div>
        <Sidebar detail={schoolDetail} />
      </div>{" "}
    </>
  );
};

export default SchoolDashboard;
