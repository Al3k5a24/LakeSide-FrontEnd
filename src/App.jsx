import './App.css'
import AddRoom from './components/room/AddRoom.jsx'
import Home from './components/home/Home.jsx'
import ExistingRooms from './components/room/ExistingRooms.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom.jsx'

function App() {

  return (    
    <>
    {/* define routes for different components */}
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/edit/edit-room/:roomId' element={<EditRoom/>}/>
          <Route path='/existingRooms' element={<ExistingRooms/>}/>
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
