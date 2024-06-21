import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Meet from '@/pages/Meet';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import { WebsocketProvider } from './providers/WebSocketProvider';

function App() {
  return <BrowserRouter>
    <WebsocketProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/meet/:roomId" element={<Meet />} />
        <Route path='create' element={<CreateRoom />} />
        <Route path='join' element={<JoinRoom />} />
      </Routes>
    </WebsocketProvider>
  </BrowserRouter>
}

export default App
