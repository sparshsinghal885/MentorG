import React, { useContext } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MyContext from "@/contexts/firebaseContext/MyContext";
import TopicsDetail from "@/components/myComponents/admin/TopicsDetail";
import UserDetail from "@/components/myComponents/admin/UserDetail";

const AdminDashboard = () => {
  const { topics, getAllUser } = useContext(MyContext);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {/* Top */}
      <div className="top mb-5 px-5 mt-5">
        <div className=" bg-orange-100 py-5 border border-orange-200 rounded-lg">
          <h1 className=" text-center text-2xl font-bold text-black">Admin Dashboard</h1>
        </div>
      </div>

      <div className="px-5">
        {/* Mid  */}
        <div className="mid mb-5">
          {/* main  */}
          <div className=" bg-orange-100 py-5 rounded-xl border border-orange-200">
            {/* image  */}
            <div className="flex justify-center">
              <img src={user.imageUrl} alt="logo" className="w-20" />
            </div>
            <div className="mt-4">
              <h1 className=" text-center text-lg text-black"><span className=" font-bold">Name :</span> {user?.name} </h1>
              <h1 className=" text-center text-lg text-black"><span className=" font-bold">Email :</span> {user?.email} </h1>
              <h1 className=" text-center text-lg text-black"><span className=" font-bold">Date :</span> {user?.date} </h1>
              <h1 className=" text-center text-lg text-black"><span className=" font-bold">Role :</span> {user?.role} </h1>
            </div>
          </div>
        </div>


        <div className="">
          <Tabs>
            <TabList className="flex flex-wrap -m-4 text-center justify-center">
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className=" border  bg-orange-50 hover:bg-orange-100 border-orange-200 px-4 py-3 rounded-xl" >
                  <div className="text-black w-12 h-12 mb-3 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list"
                    >
                      <path d="M8 6h13" />
                      <path d="M8 12h13" />
                      <path d="M8 18h13" />
                      <path d="M3 6h.01" />
                      <path d="M3 12h.01" />
                      <path d="M3 18h.01" />
                    </svg>
                  </div>

                  <h2 className="title-font font-medium text-3xl text-black fonts1" >{topics.length}</h2>
                  <p className=" text-black  font-bold" >Total Topics</p>
                </div>
              </Tab>

              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className=" border bg-orange-50 hover:bg-orange-100 border-orange-200 px-4 py-3 rounded-xl" >
                  <div className="text-black w-12 h-12 mb-3 inline-block" >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                  </div>
                  <h2 className="title-font font-medium text-3xl text-black fonts1" >{getAllUser.length}</h2>
                  <p className=" text-black  font-bold" >Total User</p>
                </div>
              </Tab>

            </TabList>

            <TabPanel>
              <TopicsDetail/>
            </TabPanel>

            <TabPanel>
              <UserDetail/>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;