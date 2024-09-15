import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CodeBox from './pages/CodeBox.jsx'
import AlgoPage from './pages/AlgoPage.jsx'
import DSPage from './pages/DSPage.jsx'
import LearnPage from './pages/LearnPage.jsx'
import ChatBox from './pages/ChatBox.jsx'

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
          children: [
            {
              path: '/learn/algo',
              element: <AlgoPage />,
            },
            {
              path: '/learn/ds',
              element: <DSPage />,
            },
          ]
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
