import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements, RouterProvider,Route} from 'react-router-dom'
import Create_trip from './components/Create_trip.jsx'
import Home from './components/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Trip_details from './Pages/Trip_details.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import About from './Pages/About.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>,
      <Route path='/' element={<Home />}/>,
      <Route path='/signup' element={<SignUp/>}/>,
      <Route path='/about' element={<About/>}/>,
      <Route path='/login' element={<Login/>}/>,
      <Route path='/create-trip' element={<Create_trip />} />
      <Route path='/trip-details' element={<Trip_details/>} />


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
