import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  let today = new Date();
  
  return (
    <footer className="footer">
      <div
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "15px 0",
          width: "100%",
          textAlign: "center",
          width:"full"
        }}
      >
        <Container>
          <Row className="justify-center text-center">
            <Col>
              <p className="text-sm md:text-base font-medium tracking-wide">
                &copy; {today.getFullYear()}{" "}
                <span className="text-red-500 font-semibold">lakeSide Hotel</span> — All Rights Reserved
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer