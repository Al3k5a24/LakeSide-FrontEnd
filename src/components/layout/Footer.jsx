import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
let today=new Date();
  return (
    <Footer>
      <Container>
        <Row>
            <Col>
            <p>&copy; {today.getFullYear()} lakeSide Hotel</p>
            </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default Footer
