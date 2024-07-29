import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  return (
    <>
      <h3>HOMEPAGE ROUTE</h3>
      <button onClick={() => navigate("/knowmore")}>Know More</button>
      <button onClick={() => navigate("/applynow")}>Apply Now</button>
    </>
  );
};

export default First;
