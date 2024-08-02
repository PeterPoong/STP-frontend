import React from "react";
import { Card } from 'react-bootstrap';

function LoginCard(){
    return(
        <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <p>Hello World</p>
        </Card.Body>
      </Card>
    </div>
    );
}

export default LoginCard;