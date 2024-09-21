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
import { auth, fireDB, storage } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import MyContext from '../../contexts/firebaseContext/MyContext'
import { useToast } from "../../hooks/use-toast"
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const Register = () => {
  const { toast } = useToast();
  const { isLoggedIn, setIsLoggedIn, loading, setLoading } = useContext(MyContext);

  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setUserRegister({ ...userRegister, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (userRegister.name === "" || userRegister.email === "" || userRegister.password === "" || !userRegister.image) {
      toast({
        title: "All fields are required, including the image",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Create user with email and password
      const users = await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password);

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `users/${users.user.uid}/profileImage`);
      await uploadBytes(imageRef, userRegister.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Create user object
      const user = {
        name: userRegister.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userRegister.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        totalTopicsLearned: 0,
        recentLearnedTopics: [],
        suggestedTopics: [],
        dailyTimeSpent: {
          
        },
        imageUrl: imageUrl,
      };

      // Add user data to Firestore
      const userReference = collection(fireDB, "user");
      await addDoc(userReference, user);

      toast({
        title: `Successfully Registered as ${user.name}`,
      });

      // Reset form
      setUserRegister({
        name: "",
        email: "",
        password: "",
        image: null,
      });

      setIsLoggedIn(true);
      setLoading(false);
      navigate("/");
      
    } catch (error) {
      console.log(error);
      toast({
        title: "Error during registration",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

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
            <div className="grid gap-2">
              <Label htmlFor="img">User Image</Label>
              <input
                id="img"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                required
                onChange={handleImageChange} 
                className='m-2  rounded-sm'
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="submit" 
              className="w-full bg-[#e67715] "
              disabled={loading} // Disable button when loading
            >
              {loading ? "Registering..." : "Create an account"}
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
  );
}

export default Register;
