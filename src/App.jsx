import './App.css'
import AddRoom from './components/room/roomPosting/AddRoom.jsx'
import Home from './components/home/Home.jsx'
import ExistingRooms from './components/room/roomPosting/ExistingRooms.tsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import EditRoom from './components/room/roomPosting/EditRoom.jsx'
import NavBar from './components/layout/NavBar.jsx'
import Footer from './components/layout/Footer.jsx'
import RoomListing from './components/room/Listing/RoomListing.jsx'
import BookingRoomPage from './components/room/BookingRoomPage.jsx'
import LoginPage from './components/Authentication/LoginPage.jsx'
import RegisterPage from './components/Authentication/RegisterPage.jsx'
import React from 'react'
import MyBRoomListing from './components/room/myBookings/MyBRoomListing.jsx'

// /p is when user is logged in
function App() {

  return (    
    <Router>
      <div className='App'>
        <div className='App__container'>
          <NavBar/>
          <main className="App__content">
            <Routes>
              {/* public routes */}
              <Route path='/' element={<Home/>}/>
              <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
              <Route path='/existingRooms' element={<ExistingRooms/>}/>
              <Route path='/add/new-room' element={<AddRoom/>}/>
              <Route path='/browse-rooms' element={<RoomListing/>}/>
              <Route path='/browse-rooms/booking/:roomId' element={<BookingRoomPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>

              {/* auth user routes */}
              <Route path='/u' element={<Home/>}/>
              <Route path='/u/existingRooms' element={<ExistingRooms/>}/>
              <Route path='/u/browse-rooms' element={<RoomListing/>}/>
              <Route path='/u/browse-rooms/booking/:roomId' element={<BookingRoomPage/>}/>
              <Route path='/u/my-booking' element={<MyBRoomListing/>}/>
            </Routes>
          </main>
        </div>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
