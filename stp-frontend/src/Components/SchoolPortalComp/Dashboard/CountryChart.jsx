import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Box from "@mui/material/Box";
import { Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import "../../../css/SchoolPortalStyle/SchoolDashboard.css";
// Define your chart options for pie chart
const options = {
  pieHole: 0.4,
  is3D: false,
  legend: {
    position: "bottom",
    alignment: "center",
  },
  chartArea: {
    width: "80%",
    height: "70%",
    top: "10%",
  },
  animation: {
    startup: true,
    duration: 1000,
    easing: "out",
  },
};

export const barOptions = {
  seriesType: "bars",
  legend: {
    position: "bottom",
    alignment: "center",
  },
  isStacked: true,
  bar: {
    groupWidth: "30%", // Thinner bars (adjust as needed)
  },
  // animation: {
  //   startup: true,
  //   duration: 1000,
  //   easing: "out",
  // },
};

const CountryChart = ({ typeOfFilter }) => {
  const [itemNb, setItemNb] = useState(5);
  const [itemBarNb, setItemBarNb] = useState(5);

  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartKey, setChartKey] = useState(0); // Add a key state
  const [barChartKey, setBarChartKey] = useState(0);

  const token = sessionStorage.getItem("token");
  const modifiedData = [["Country", "Count"], ...pieChartData.slice(0, itemNb)];
  const modifiedBarData = [
    ["Country", "Pending", "Accept", "Reject"],
    ...barChartData.slice(0, itemBarNb),
  ];

  // const modifiedBarData = [
  //   ["Country", "Pending", "Accept", "Reject"],
  //   ["USA", 100, 50, 20],
  //   ["UK", 80, 40, 10],
  // ];

  useEffect(() => {
    const getCountryStatistic = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const formData = { filterDuration: typeOfFilter };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/countryStatisticPieChart`,
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
        const statisticData = fetchedData.data;

        if (Array.isArray(statisticData) && statisticData.length > 0) {
          setPieChartData(statisticData);
          setChartKey((prevKey) => prevKey + 1); // Update chartKey to trigger re-render
        } else {
          setPieChartData([]);
        }
      } catch (error) {
        console.error("Failed to get country statistic:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCountryBarStatistic = async () => {
      try {
        const formData = { filterDuration: typeOfFilter };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/countryStatisticBarGraph`,
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
        const statisticData = fetchedData.data;

        if (Array.isArray(statisticData) && statisticData.length > 0) {
          // console.log("bar", statisticData);
          setBarChartData(statisticData);
          setBarChartKey((prevKey) => prevKey + 1); // Update chartKey to trigger re-render
        } else {
          // console.log("bar", statisticData);

          setBarChartData([]);
        }
      } catch (error) {
        console.error("Failed to get country bar chart:", error);
      }
    };

    getCountryStatistic();
    getCountryBarStatistic();
  }, [token, typeOfFilter]);

  return (
    <>
      <Row className="mt-5">
        <Col md={6}>
          {/* <Typography variant="h8" gutterBottom>
            <b>
              Distribution of Applications by{" "}
              <span style={{ color: "#B71A18" }}>COUNTRY</span>
            </b>
          </Typography> */}
          <div style={{ fontSize: "1.25rem" }}>
            <b>
              Distribution of Applications by{" "}
              <span style={{ color: "#B71A18" }}>COUNTRY</span>
            </b>
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
            ) : pieChartData.length === 0 ? (
              <Typography>No data available</Typography>
            ) : (
              <Chart
                key={chartKey} // Use the key prop to force a re-render
                chartType="PieChart"
                width="100%"
                height="400px"
                data={modifiedData}
                options={options}
              />
            )}
          </Box>
        </Col>

        <Col md={6}>
          {/* <Typography variant="h8" gutterBottom>
            <b>
              Number of Applications by{" "}
              <span style={{ color: "#B71A18" }}>COUNTRY</span>
            </b>
          </Typography>*/}
          <div style={{ fontSize: "1.25rem" }}>
            <b>
              Number of Applications by{" "}
              <span style={{ color: "#B71A18" }}>COUNTRY</span>
            </b>
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
            ) : barChartData.length === 0 ? (
              <Typography>No data available</Typography>
            ) : (
              <Chart
                chartType="ComboChart"
                width="100%"
                height="400px"
                data={modifiedBarData}
                options={barOptions}
              />
            )}
          </Box>
        </Col>
      </Row>
    </>
  );
};

export default CountryChart;
