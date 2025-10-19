import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// cards that will display all rooms
const RoomCard = ({room}) => {
  return (
    // Based on id, render a single room card
    <Col key={room.id}>
      <Card>
        <Card.Body>
            <div>
                <Card.Img variant='top'
                // image is type blob, in order to display it, it needs to be converted to base64
                src={`data:image/png;base64, ${room.photo}`}
                alt='Room Photo'
                style={{width:"100%",maxWidth:"200px",height:"auto"}}/>
            </div>
            <div>
                <Card.Title>{room.roomType}</Card.Title>
                <Card.Title>{room.roomPrice}</Card.Title>
                <Card.Text>Some room information should be displayed here</Card.Text>
            </div>

            <div>
                <Link to={`booking/${room.id}`}>Book now</Link>
            </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default RoomCard
