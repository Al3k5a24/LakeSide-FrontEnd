import './App.css'
import AddRoom from './components/room/AddRoom.jsx'
import Home from './components/home/Home.jsx'
import ExistingRooms from './components/room/ExistingRooms.tsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom.jsx'
import NavBar from './components/layout/NavBar.jsx'
import Footer from './components/layout/Footer.jsx'
import RoomListing from './components/room/RoomListing.jsx'
import BookingRoomPage from './components/room/BookingRoomPage.jsx'

function App() {

  return (    
    <>
    {/* define routes for different components */}
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
          <Route path='/existingRooms' element={<ExistingRooms/>}/>
          <Route path='/add/new-room' element={<AddRoom/>}/>
          <Route path='/browse-rooms' element={<RoomListing/>}/>
          <Route path='/browse-rooms/booking/:roomId' element={<BookingRoomPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </main>
    </>
  )
}

export default App
