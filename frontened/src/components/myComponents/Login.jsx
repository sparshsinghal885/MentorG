import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MyContext from "@/contexts/myContext/MyContext"
import { useContext, useState } from "react"
import { auth, fireDB } from "../../../firebase/firebase";
import { DotLoader } from "react-spinners"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { query, collection, where, onSnapshot } from "firebase/firestore"
import { useToast } from "../../hooks/use-toast"

export function Login() {
  const { toast } = useToast()

  const {
    isLoggedIn,
    setIsLoggedIn,
    loading,
    setLoading } = useContext(MyContext);

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const userLoginFunction = async () => {
    // validation 
    if (userLogin.email === "" || userLogin.password === "") {
      return toast({
        title: "All fields are required",
      })
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      // console.log(users.user)

      try {
        const q = query(
          collection(fireDB, "user"),
          where('uid', '==', users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem("users", JSON.stringify(user))
          toast({
            title: `Successfully Logged in as ${user.name}`,
          })
          setUserLogin({
            email: "",
            password: ""
          })

          setIsLoggedIn(true);
          setLoading(false);
          navigate('/');
          // if (user.role === "user") {
          //   navigate('/user-dashboard');
          // } else {
          //   navigate('/admin-dashboard');
          // }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <div className='w-full mt-4 flex justify-center'>
          {loading && <DotLoader color='#e67715' />}
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userLogin.email}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={userLogin.password}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    password: e.target.value
                  })
                }}
                placeholder="Enter Password"
                required />
            </div>
            <Button
              onClick={userLoginFunction}
              className="w-full bg-[#e67715]">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
