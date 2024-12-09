import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
//import Signin from './pages/SignIn.js'
import Home from './pages/Home.js'
import Game from './pages/Game.js'
import Profile from './pages/Profile.js'
import Contribute from './pages/Contribute.js'
//import 'semantic-ui-css/semantic.min.css'
// import CategorySelector from './components/CategorySelector.js'
import Game1 from './pages/Game1.js'
import Game2 from './pages/Game2.js'
// import Game3 from './pages/Game3.js'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
       {
         index: true,
         element: < Home/>
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
        path: '/game1',
        element : < Game1/>
      },
      {
        path: '/game2',
        element : < Game2/>
      },
      // {
      //   path: '/game3',
      //   element : < Game3/>
      // },
      {
        path: '/profile',
        element: < Profile/>
      },
      {
        path: '/contribute',
        element: < Contribute/>
      },
      {
        path: '/streakModeRandom',
        element: < Contribute/>
      },
      // {
      //   path: '/categorySelector',
      //   element: <CategorySelector/>
      // }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
