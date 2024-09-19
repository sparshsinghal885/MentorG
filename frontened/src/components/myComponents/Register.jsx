import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { DotLoader } from "react-spinners"
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import MyContext from '../../contexts/firebaseContext/MyContext'
import { useToast } from "../../hooks/use-toast"

const Register = () => {
  const { toast } = useToast()
  const {
    isLoggedIn,
    setIsLoggedIn,
    loading,
    setLoading } = useContext(MyContext);

  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (userRegister.name === "" || userRegister.email === "" || userRegister.password === "") {
      toast({
        title: "All fields are required",
      })
    }

    try {
      setLoading(true);
      const users = await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password);

      // create user object
      const user = {
        name: userRegister.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userRegister.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
        // New fields
        totalTopicsLearned: 0,  
        recentLearnedTopics: [], 
        suggestedTopics: [], // Array to store suggested topics
        dailyTimeSpent: {
          Monday: 0,   // Time spent on Monday (in minutes or hours)
          Tuesday: 0,  // Time spent on Tuesday
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,
        }
      }
      

      // create user Refrence
      const userRefrence = collection(fireDB, "user")

      // Add User Detail
      addDoc(userRefrence, user);
      toast({
        title: `Successfully Logged in as ${user.name}`,
      })
      setUserRegister({
        name: "",
        email: "",
        password: ""
      })

      setIsLoggedIn(true);
      setLoading(false);
      navigate('/')
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
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="first-name"
                  placeholder="John Doe"
                  required
                  value={userRegister.name}
                  onChange={(e) => {
                    setUserRegister({
                      ...userRegister,
                      name: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userRegister.email}
                onChange={(e) => {
                  setUserRegister({
                    ...userRegister,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={userRegister.password}
                required
                onChange={(e) => {
                  setUserRegister({
                    ...userRegister,
                    password: e.target.value
                  })
                }} />
            </div>
            <Button
              onClick={handleSubmit}
              type="submit" className="w-full bg-[#e67715] " >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
