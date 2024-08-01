// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import VideoSlide from "../Components/VideoSlide";
// import "../LoginForm.css";
// import FeaturedUni from "../../Components/student components/FeaturedUni";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   return (
//     <div>
//       <div className="featured-uni-section">
//         <FeaturedUni />
//       </div>
//       <div className="login-container">
//         <Container className="d-flex flex-column justify-content-center align-items-center">
//           <Row className="w-100">
//             <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
//               <h2 className="text-center mb-4">Login</h2>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formBasicEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100 mt-3">
//                   Login
//                 </Button>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
