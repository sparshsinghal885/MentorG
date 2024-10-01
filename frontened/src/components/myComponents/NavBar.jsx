import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MyContext from "../../contexts/firebaseContext/MyContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        {href ? (
          <Link
            ref={ref}
            to={href}
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
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
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
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
);

ListItem.displayName = "ListItem";

const NavBar = () => {
  const [user, setUser] = useState();
  const { isLoggedIn, setIsLoggedIn, topics } = useContext(MyContext);
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const Logout = () => {
    signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItems = [
    { label: "AI Chatbox", href: "/chatbox" },
    ...(user ? [{ label: "DashBoard", href: `/${user?.role}-dashboard/${user.uid}` }] : []),
  ];

  const algorithmTopics = topics?.filter(topic => topic.category === 'Algorithm');
  const dataStructureTopics = topics?.filter(topic => topic.category === 'Data Structure');

  return (
    <div className="flex justify-between max-h-24 sticky top-0 z-50 py-3 bg-white backdrop-blur-lg border-b border-neutral-300">
      <Link to="/" className="m-6 mb-6">
        <h2 className="text-4xl font-semibold h-full w-full mb-6">MentorG</h2>
      </Link>
      <NavigationMenu className="hidden md:inline-flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {algorithmTopics?.map(topic => (
                  <ListItem
                    key={topic.title}
                    title={topic.title}
                    href={`/dsa/${topic.id}`}
                  >
                    {topic.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Data Structures</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {dataStructureTopics?.map(topic => (
                  <ListItem
                    key={topic.title}
                    title={topic.title}
                    href={`/dsa/${topic.id}`}
                  >
                    {topic.description}
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
          {user && (
            <NavigationMenuItem>
              <Link to={`/${user.role}-dashboard/${user.uid}`}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  DashBoard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile drawer and other parts remain the same */}
      {/* Additional mobile drawer code */}
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
        <div className="fixed top-0 right-0 w-[75%] max-w-xs bg-white p-6 shadow-lg z-50 border-l border-gray-300 transform transition-transform ease-in-out duration-300 md:hidden">
          <button onClick={toggleNavBar} className="mb-6">
            <X size={24} />
          </button>
          <ul className="space-y-6">
            <li className="py-2">
              <Link
                to="/algo"
                onClick={toggleNavBar}
                className="text-lg font-semibold"
              >
                Algorithms
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/ds"
                onClick={toggleNavBar}
                className="text-lg font-semibold"
              >
                Data Structures
              </Link>
            </li>
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
            {isLoggedIn ? (
              <Button onClick={Logout} className="m-2 mb-3 bg-[#e67715]">
                Logout
              </Button>
            ) : (
              <div className="mt-8">
                <Button
                  onClick={() => navigate("/auth/register")}
                  variant="outline"
                  className="w-full mb-3"
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/auth/login")}
                  className="w-full bg-[#e67715]"
                >
                  Login
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}


    </div>
  );
};

export default NavBar;
