import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import styles from "../../css/StudentCss/TestSocialPage.module.css";
// import styles from "./TestSocialPage.module.css"; // Import CSS module

const FacebookSocialPageRedirectPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // React Router's hook for navigation

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("data"); // Get encrypted data from URL params
    //console.log("Encrypt", encryptedData);

    const decryptData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/decrypt-data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ encryptedData: encryptedData }),
          }
        );

        const result = await response.json();

        if (result.success) {
          const parsedData = JSON.parse(result.data);
          const { token, user_name, id, contact } = parsedData;

          localStorage.setItem("token", token);
          localStorage.setItem("userName", user_name);
          localStorage.setItem("id", id);

          // Add a slight delay before navigating
          if (contact == false) {
            setTimeout(() => {
              setLoading(false); // Stop loading before redirect
              navigate("/SocialContactPage");
            }, 500);
          } else {
            setTimeout(() => {
              setLoading(false); // Stop loading before redirect
              navigate("/studentPortalBasicInformations");
              // navigate("/SocialContactPage");
            }, 500);
          }
        } else {
          setError(result.message);
          setLoading(false); // Stop loading on error
        }
      } catch (error) {
        setError("Failed to fetch the decrypted data");
        setLoading(false); // Stop loading on fetch error
      }
    };

    if (encryptedData) {
      decryptData(); // Only call if encryptedData exists in the URL
    } else {
      setError("No encrypted data found in URL");
      setLoading(false); // Stop loading if no encrypted data
    }
  }, []); // Empty dependency array so it runs once on mount

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p className={styles.message}>Redirecting, please wait...</p>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : null}
    </div>
  );
};

export default FacebookSocialPageRedirectPage;
