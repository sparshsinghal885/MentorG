import MyContext from "@/contexts/firebaseContext/MyContext";
import React, { useContext } from "react";


const UserDetail = () => {

  const { getAllUser } = useContext(MyContext)

  return (
    <div>
      <div>
        <div className="py-5  w-full">
          <h1 className=" text-2xl text-slate-900 font-bold text-center">All Users</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-orange-200 text-slate-500" >
            <tbody>
              <tr>
                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  S.No.
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  Name
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  Email
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  Uid
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  Role
                </th>

                <th scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-orange-200 text-slate-700 bg-orange-100 font-bold fontPara">
                  Date
                </th>
              </tr>

              {getAllUser.map((user, index) => {
                return (
                  <tr className="text-slate-500" key={user.id}>
                    <td
                      className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 ">
                      {index + 1}
                    </td>

                    <td
                      className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 first-letter:uppercase ">
                      {user.name}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 cursor-pointer ">
                      {user.email}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 cursor-pointer ">
                      {user.uid}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 cursor-pointer ">
                      {user.role}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-orange-200 stroke-orange-500 text-slate-500 cursor-pointer ">
                      {user.date}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;