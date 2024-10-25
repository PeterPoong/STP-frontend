import { useEffect, useState } from "react";

const TestSocialPage = () => {
  const [token, setToken] = useState(""); // State to store the token

  useEffect(() => {
    // Call an API endpoint to get the token stored in the session
    fetch("http://localhost:8000/api/get-token", {
      method: "GET",
      credentials: "include", // This is important to send cookies
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching token");
        }
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        setToken(token); // Set the token in state
        // Store the token in localStorage if needed
        localStorage.setItem("authToken", token);
      })
      .catch((error) => {
        console.error("Error fetching token", error);
      });
  }, []);

  return (
    <>
      <div>Test Page</div>
      <div>Token: {token}</div> {/* Display the token */}
    </>
  );
};

export default TestSocialPage;
