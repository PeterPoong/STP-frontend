import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import "../../../css/SchoolPortalStyle/SchoolDashboard.css";
import { format } from "date-fns";

const options = {
  title: "",
  curveType: "none",
  legend: { position: "bottom" },
  hAxis: {
    title: "Day",
    titleTextStyle: {
      fontSize: 14,
      color: "#333",
      bold: true,
    },
    format: "00",
    slantedText: true,
    slantedTextAngle: 45,
  },
  vAxis: {
    title: "Visits",
    titleTextStyle: {
      fontSize: 14,
      color: "#333",
      bold: true,
    },
    minValue: 0,
    gridlines: { color: "#f3f3f3" },
    viewWindow: {
      min: 0,
    },
  },
  tooltip: {
    isHtml: true,
    trigger: "focus",
  },
  pointSize: 7,
  series: {
    0: { color: "#4caf50" },
  },
  chartArea: {
    width: "80%",
    height: "70%",
  },
  backgroundColor: "#fafafa",
  fontName: "Arial",
  fontSize: 12,
};

// const graphBarOptions = {
//   title: "Yearly Visit Statistics",
//   chartArea: { width: "50%" },
//   hAxis: {
//     title: "Total Visits", // This will be horizontal
//     minValue: 0,
//   },
//   vAxis: {
//     title: "Month", // This will be vertical
//   },
//   backgroundColor: "#fafafa",
//   fontName: "Arial",
//   fontSize: 12,
//   colors: ["#4caf50"], // Green bars for the visits
// };
export const graphBarOptions = {
  seriesType: "bars",
  legend: {
    position: "bottom",
    alignment: "center",
  },
  bar: {
    groupWidth: "40%", // Adjust bar width here
  },
  // animation: {
  //   startup: true,
  //   duration: 1000,
  //   easing: "out",
  // },
};

const VisitLineChart = () => {
  //line bar setting
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [graphBarYearList, setGraphBarYearList] = useState([]);
  const [lineData, setLineData] = useState();
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  // Initializing selected month to current month
  const [selectedYear, setSelectedYear] = useState(format(new Date(), "yyyy"));
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "MMMM")
  );

  const handleYearChange = (event) => {
    // console.log("year selected", event.target.value);
    setSelectedYear(event.target.value);
    setSelectedMonth("Please Select Month"); // Reset month to "Please Select Month" when year changes
  };

  const handleMonthChange = (event) => {
    // console.log("month selected", event.target.value);
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const getYear = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/getYearListNumberVisit`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData["error"] || "Internal Server Error");
        }

        const fetchedData = await response.json();

        setYearList(fetchedData.data);
        setGraphBarYearList(fetchedData.data);
      } catch (error) {
        console.error("Failed to get year list:", error);
      }
    };

    getYear();
  }, []);

  useEffect(() => {
    const getMonth = async () => {
      try {
        const formData = { year: selectedYear };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/getVisitMonthlyList`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData["error"] || "Internal Server Error");
        }

        const fetchedData = await response.json();

        // Adding the "Please Select Month" as the first option
        setMonthList(["Please Select Month", ...fetchedData.data]);
      } catch (error) {
        console.error("Failed to get month list:", error);
      }
    };

    getMonth();
  }, [selectedYear]);

  useEffect(() => {
    const getData = async () => {
      if (selectedMonth === "Please Select Month") {
        return; // Don't fetch data if "Please Select Month" is selected
      }

      try {
        const formData = {
          year: parseInt(selectedYear),
          month: selectedMonth,
        };

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/getMonthlyNumberVisit`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData["error"] || "Internal Server Error");
        }

        setLoading(false);
        const fetchedData = await response.json();

        const formattedData = [
          ["Day", "Total Number Visit"],
          ...fetchedData.data.map(([day, visits]) => {
            const safeVisits = Math.max(visits, 0);
            return [day, safeVisits];
          }),
        ];
        setLineData(formattedData);
      } catch (error) {
        console.error("Failed to get graph data list:", error);
      }
    };
    getData();
  }, [selectedMonth, selectedYear]);

  //bar chart setting

  const [barData, setBarData] = useState();
  const [graphloading, setGraphLoading] = useState(true);
  const [selectedGraphYear, setGraphSelectedYear] = useState(
    format(new Date(), "yyyy")
  );
  const [graphBarDataLength, setGraphBarDataLength] = useState();
  const handleBarChange = (event) => {
    setGraphSelectedYear(event.target.value);
  };

  useEffect(() => {
    const getBarData = async () => {
      try {
        const formData = {
          year: parseInt(selectedGraphYear),
        };
        console.log("formdata", formData);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/getYearlyNumberVisit`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData["error"] || "Internal Server Error");
        }
        setGraphLoading(false);
        // setLoading(false);
        const fetchedData = await response.json();

        // Adjust the data formatting here
        const formattedData = [
          ["Month", "Total Number Visit"], // Titles for x and y axes
          ...fetchedData.data.map(({ month, totalNumberVisit }) => [
            month, // The month name
            totalNumberVisit, // The total number of visits for that month
          ]),
        ];
        console.log("yearly data", formattedData);
        console.log("length", formattedData.length);
        setGraphBarDataLength(formattedData.length);
        setBarData(formattedData);
      } catch (error) {
        console.error("Failed to get graph data list:", error);
      }
    };
    getBarData();
  }, [selectedGraphYear]);

  return (
    <div style={{ height: "500px", width: "100%", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h5 className="mt-3">Monthly Visit Statistic</h5>

        <label htmlFor="year" style={{ marginRight: "10px" }}>
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          style={{
            padding: "5px",
            fontSize: "15px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {yearList.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label
          htmlFor="month"
          style={{ marginLeft: "20px", marginRight: "10px" }}
        >
          Select Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{
            padding: "5px",
            fontSize: "15px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {monthList.map((month, index) => (
            <option
              key={index}
              value={month}
              disabled={month === "Please Select Month"}
            >
              {month}
            </option>
          ))}
        </select>
      </div>

      <Box
        sx={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
        }}
      >
        {loading ? (
          <Skeleton />
        ) : lineData && lineData.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={lineData}
            options={options}
          />
        )}
      </Box>

      <div style={{ marginBottom: "20px" }}>
        <h5 className="mt-3">Yearly Visit Statistic</h5>
        <label htmlFor="year" style={{ marginRight: "10px" }}>
          Select Year:
        </label>
        <select
          id="year"
          value={selectedGraphYear}
          onChange={handleBarChange}
          style={{
            padding: "5px",
            fontSize: "15px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {graphBarYearList.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
        }}
      >
        {graphloading ? (
          <Skeleton />
        ) : graphBarDataLength == 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={barData}
            options={graphBarOptions}
          />
        )}
      </Box>
    </div>
  );
};

export default VisitLineChart;
