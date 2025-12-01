import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link, matchPath, useLocation } from "react-router-dom";

// cards that will display all rooms
const MyBRoomCard = ({ room }) => {
  //check if user is authenticated
  const currentURL = window.location.pathname;
  const location = useLocation();
  // /p/* will be used for all logged in user routes
  const match = matchPath("/u/*", currentURL);

  //paths where user should be redirected on book now click
  const intendedDestination = match 
    ? `browse-rooms/booking/${room.id}` 
    : `/u/browse-rooms/booking/${room.id}`;
  return (
    // Based on id, render a single room card
    <Col
      key={room.id}
      className="bg-white items-center py-4 px-3 rounded-4xl 
    shadow-xl inset-shadow-sm inset-shadow-gray-400 space-y-5"
    >
      <Card className="space-y-3">
        <Card.Body className="flex space-x-4">
          <div className="inline-flex">
            <Card.Img
              variant="top"
              // image is type blob, in order to display it, it needs to be converted to base64
              src={`data:image/png;base64, ${room.photo}`}
              alt="Room Photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
          </div>
          <div className="w-2/3 ml-5 flex flex-col items-start justify-center space-y-4">
            <Card.Title className="text-2xl font-bold text-gray-900">
              {room.roomType}
            </Card.Title>
            <Card.Title className="text-xl text-red-500 font-semibold">
              $ {room.roomPrice}
              <span className="text-black"> / night</span>
            </Card.Title>
            <Card.Text className="text-gray-600 text-center max-w-md">
              Some room information should be displayed here
            </Card.Text>
          </div>

          {/* If user is not authenticated, redirect to login page on book now click
          Do not allow user to book room if not logged in */}
          <div className="flex-1 relative">
            {match ? (
              <Link
                to={`booking/${room.id}`}
                className="absolute top-1/3 right-3 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-medium rounded-lg shadow-md whitespace-nowrap transition duration-200"
              >
                Book now
              </Link>
            ) : (
              <Link
                to="/login"
                //remember the page user was on before being redirected to login
                //on successful login, redirect back to this page
                state={{ from: intendedDestination }}
                className="absolute top-1/3 right-3 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-medium rounded-lg shadow-md whitespace-nowrap transition duration-200"
              >
                Book now
              </Link>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyBRoomCard;
