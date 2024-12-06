import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import Signin from './pages/SignIn.js'
import Home from './pages/Home.js'
import Game from './pages/Game.js'
import Profile from './pages/Profile.js'
import Contribute from './pages/Contribute.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: < Signin/>
      }, 
      {
        path: '/home',
        element: < Home/>
      },
      {
        path: '/game',
        element : < Game/>
      },
      {
        path: '/profile',
        element: < Profile/>
      },
      {
        path: '/contribute',
        element: < Contribute/>
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
