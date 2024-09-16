import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client.js'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CodeBox from './pages/CodeBox.jsx'
import AlgoPage from './pages/AlgoPage.jsx'
import DSPage from './pages/DSPage.jsx'
import LearnPage from './pages/LearnPage.jsx'
import ChatBox from './pages/ChatBox.jsx'
import { Login } from './components/myComponents/Login.jsx'
import Register from './components/myComponents/Register.jsx'
import TopicPage from './pages/TopicPage.jsx'
import MyContextProvider from '../contexts/myContext/MyContextProvider.jsx'
import { Toaster } from './components/ui/toaster.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/codebox',
          element: <CodeBox />,
        },
        {
          path: '/chatbox',
          element: <ChatBox />,
        },
        {
          path: '/learn',
          element: <LearnPage />,
        },
        {
          path: '/algo',
          element: <AlgoPage />,
        },
        {
          path: '/ds',
          element: <DSPage />,
        },
        {
          path: '/dsa/:topic',
          element: <TopicPage />
        }
      ]
    },
    {
      path: "/auth/login",
      element: <Login />
    },
    {
      path: "/auth/register",
      element: <Register />
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </MyContextProvider>
  </StrictMode>
)
