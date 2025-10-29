import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
let today=new Date();
  return (
  //  To set the footer at the bottom of the page, use fixed positioning
   <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        width: "100%",
        textAlign: "center",
        marginTop:"auto"
      }}>
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
    </footer>

  )
}
export default Footer