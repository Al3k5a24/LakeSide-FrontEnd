import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
let today=new Date();
  return (
    <footer>
      <Container>
        <Row>
            <Col>
            <p> &copy; {today.getFullYear()} lakeSide Hotel</p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
