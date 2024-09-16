"use client"
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { useState } from "react"
import { useContext, useEffect } from "react"
import MyContext from "../../contexts/firebaseContext/MyContext"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut } from 'firebase/auth'
import { auth } from "../../../firebase/firebase.js"

const components = [
  {
    title: "Array",
    href: "/dsa/array",
    description:
      "A collection of elements stored in contiguous memory locations.",
  },
  {
    title: "Linked List",
    href: "/dsa/linked-list",
    description:
      " A collection of elements connected by pointers.",
  },
  {
    title: "Stack",
    href: "/dsa/stack",
    description:
      "A LIFO (Last-In-First-Out) data structure.",
  },
  {
    title: "Queue",
    href: "/dsa/queue",
    description: "A FIFO (First-In-First-Out) data structure.",
  },
  {
    title: "Binary Tree",
    href: "/dsa/binary-tree",
    description:
      "A tree where each node has at most two children.",
  },
  {
    title: "Graph",
    href: "/dsa/graph",
    description:
      "A collection of nodes (vertices) connected by edges.",
  },
]

// for small screens only


// Corrected ListItem component with no nested <a> tags
const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {href ? (
            <Link
              ref={ref}
              to={href}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </Link>
          ) : (
            <div
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          )}
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

// Updated NavBar component for React.js with improved mobile styling
const NavBar = () => {

  const [user, setUser] = useState()
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('users'));
    setUser(storedUser);
  }, [])

  const {
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(MyContext);

  const navigate = useNavigate()

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }

  const Logout = () => {
    signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

  const navItems = [
    {
      label: "Algorithms",
      href: "/algo"
    },
    {
      label: "Data Structure",
      href: "/ds"
    },
    {
      label: "AI Chatbox",
      href: "/chatbox"
    },
    ...(user ? [
      {
        label: "DashBoard",
        href: `/${user?.role}-dashboard`
      }
    ] : [])
  ];

  return (
    <div className="flex justify-between  max-h-24 sticky top-0 z-50 py-3 bg-white backdrop-blur-lg border-b border-neutral-300">
      <Link to='/' className="m-6 mb-6">
        <h2 className="text-4xl font-semibold h-full w-full mb-6">MentorG</h2>
      </Link>
      <NavigationMenu className="hidden md:inline-flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/dsa/dynamic-programming"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Dynamic Programming
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Breaks down problems into smaller subproblems and stores their solutions to avoid redundant calculations.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/dsa/greedy-algorithm" title="Greedy Algorithms">
                  Make locally optimal choices at each step, to achieve optimal solution.
                </ListItem>
                <ListItem href="/dsa/divide-conquer-algorithm" title="Divide and Conquer">
                  Breaks down problems into smaller subproblems.
                </ListItem>
                <ListItem href="/dsa/sorting-algorithm" title="Sorting Algorithms">
                  Arrange data in ordered for efficient operations.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Data Structures</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/chatbox">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                AI ChatBox
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to={`/${user?.role}-dashboard`}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                DashBoard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="mr-8 m-2 hidden md:inline-flex">
        {isLoggedIn ?
          <Button
            onClick={Logout}
            className="m-2 mb-3 bg-[#e67715]">Logout
          </Button>
          :
          <div>
            <Button
              onClick={() => navigate('/auth/register')}
              variant="outline" className="m-2">Register</Button>
            <Button
              onClick={() => navigate('/auth/login')}
              className="m-2 mb-3 bg-[#e67715]">Login</Button>
          </div>
        }
      </div>

      <div className="md:hidden flex justify-center items-center w-16">
        <button onClick={toggleNavBar}>
          {mobileDrawerOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileDrawerOpen && (
        <div className="fixed top-0 right-0 w-[75%] max-w-xs h-full bg-white p-6 shadow-lg z-50 border-l border-gray-300 transform transition-transform ease-in-out duration-300 md:hidden">
          <button onClick={toggleNavBar} className="mb-6">
            <X size={24} />
          </button>
          <ul className="space-y-6">
            {navItems.map((item, index) => (
              <li key={index} className="py-2">
                <Link
                  to={item.href}
                  onClick={toggleNavBar}  // Close menu on link click
                  className="text-lg font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isLoggedIn ?
              <Button
                onClick={Logout}
                className="m-2 mb-3 bg-[#e67715]">Logout
              </Button>
              :
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/auth/register')}
                  variant="outline" className="w-full mb-3">Register</Button>
                <Button
                  onClick={() => navigate('/auth/login')}
                  className="w-full bg-[#e67715]">Login</Button>
              </div>
            }
          </ul>
        </div>
      )}

    </div>
  )
}

export default NavBar
