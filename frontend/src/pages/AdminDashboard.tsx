import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import UserCard from "../components/UserCard";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  course?: string;
  department?: string;
  batch?: string;
}
//route protection for the admin dashboard
const AdminDashboard = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [allUser, setAllUser] = useState(true);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [accountVerified, setAccountVerified] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [searchByBatchs, setSearchByBatchs] = useState<number[]>([]);
  const [searchByDepartments, setSearchByDepartments] = useState<string[]>([]);
  const [searchByCourses, setSearchByCourses] = useState<string[]>([]);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.post<{ data: User[] }>(
      `api/v1/admin/dashboard/users?allUser=${allUser}name=${name}&page=${page}&accountVerified=${accountVerified}&isRejected=${isRejected}`,
      { searchByBatchs, searchByDepartments, searchByCourses }
    );
    setFetchedUsers(response.data.data);
  };
  const changePage = ({ change }: any) => {
    if (page + change > 0) {
      setPage((prev) => prev + change);
    }
  };
  useDebounce(
    fetchUsers,
    [
      allUser,
      name,
      page,
      accountVerified,
      isRejected,
      searchByBatchs,
      searchByDepartments,
      searchByCourses,
    ],
    500
  );
  const batchs = Array.from({ length: 2020 - 1960 + 1 }, (_, i) => 1960 + i);
  const departments = {
    1: {
      shortName: "CHEM",
      fullName: "Chemical Engineering",
    },
    2: {
      shortName: "CIVIL",
      fullName: "Civil Engineering",
    },
    3: {
      shortName: "CSE",
      fullName: "Computer Science Engineering",
    },
    4: {
      shortName: "EE",
      fullName: "Electrical Engineering",
    },
    5: {
      shortName: "ECE",
      fullName: "Electronics and Communication Engineering",
    },
    6: {
      shortName: "IT",
      fullName: "Information Technology",
    },
    7: {
      shortName: "MECH",
      fullName: "Mechanical Engineering",
    },
    8: {
      shortName: "MME",
      fullName: "Metallurgy & Materials Engineering",
    },
  };
  const courses = { 1: "B.Tech", 2: "M.Tech", 3: "Ph.D" };
  const togglefilter = () => {
    setFilterVisible((curr) => !curr);
  };

  return (
    <div className="bg-slate-500 min-h-screen p-6">
  {/* Main Filter Section */}
  <div className="bg-white p-6 rounded-lg shadow-md">
    {/* Search by Name */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-semibold mb-2">
        Search by Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Enter name"
      />
    </div>

    {/* User Type Dropdown */}
    <div className="mb-4">
      <label htmlFor="userType" className="block text-sm font-semibold mb-2">
        Filter by User Type
      </label>
      <select
        name="userType"
        id="userType"
        onChange={(e) => {
          if (e.target.value === "all") {
            setAllUser(true);
          }
          if (e.target.value === "verified") {
            setAccountVerified(true);
          }
          if (e.target.value === "notVerified") {
            setAccountVerified(false);
          }
        }}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="all">All Users</option>
        <option value="verified">Verified Users</option>
        <option value="notVerified">Not Verified Users</option>
      </select>
    </div>

    {/* Rejected Users Checkbox */}
    {!accountVerified && (
      <div className="mb-4">
        <label htmlFor="rejectionStatus" className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setIsRejected(e.target.checked)}
            className="rounded-md"
          />
          Rejected Users
        </label>
      </div>
    )}

    {/* Toggle Filter */}
    <button
      onClick={togglefilter}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-6"
    >
      Filter
    </button>

    {/* Filters Section */}
    <div className={`${filterVisible ? "block" : "hidden"} bg-gray-100 p-6 rounded-lg`}>
      {/* Batches */}
      <form>
        <fieldset className="mb-6">
          <legend className="font-semibold mb-2">Select Batches</legend>
          <div className="flex flex-wrap gap-4">
            {batchs.map((batch) => (
              <div key={batch} className="flex items-center gap-2">
                <label htmlFor={`${batch}`} className="flex items-center gap-2">
                  <input
                    id={`${batch}`}
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchByBatchs((prevItems) => [...prevItems, batch]);
                      } else {
                        setSearchByBatchs((prevItems) =>
                          prevItems.filter((i) => i !== batch)
                        );
                      }
                    }}
                    className="rounded-md"
                  />
                  {batch}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Departments */}
        <fieldset className="mb-6">
          <legend className="font-semibold mb-2">Select Departments</legend>
          <div className="flex flex-wrap gap-4">
            {Object.entries(departments).map(([id, { shortName, fullName }]) => (
              <div key={id} className="flex items-center gap-2">
                <label htmlFor={shortName} className="flex items-center gap-2">
                  <input
                    id={shortName}
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchByDepartments((prevItems) => [
                          ...prevItems,
                          fullName,
                        ]);
                      } else {
                        setSearchByDepartments((prevItems) =>
                          prevItems.filter((i) => i !== fullName)
                        );
                      }
                    }}
                    className="rounded-md"
                  />
                  {fullName}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Courses */}
        <fieldset>
          <legend className="font-semibold mb-2">Select Courses</legend>
          <div className="flex flex-wrap gap-4">
            {Object.entries(courses).map(([id, courseName]) => (
              <div key={id} className="flex items-center gap-2">
                <label htmlFor={`course-${id}`} className="flex items-center gap-2">
                  <input
                    id={`course-${id}`}
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchByCourses((prevItems) => [
                          ...prevItems,
                          courseName,
                        ]);
                      } else {
                        setSearchByCourses((prevItems) =>
                          prevItems.filter((i) => i !== courseName)
                        );
                      }
                    }}
                    className="rounded-md"
                  />
                  {courseName}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  </div>

  {/* Pagination */}
  <div className="flex justify-center items-center gap-4 mt-6">
    <button
      onClick={() => changePage(-1)}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
    >
      Previous Page
    </button>
    <button
      onClick={() => changePage(1)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      {page + 1}
    </button>
    <button
      onClick={() => changePage(2)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      {page + 2}
    </button>
    <button
      onClick={() => changePage(3)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      {page + 3}
    </button>
    <button
      onClick={() => changePage(1)}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
    >
      Next Page
    </button>
  </div>

  {/* User Results */}
  <div className="mt-6">
  {fetchedUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <UserCard user={user} />
          
        </div>
      ))}
  </div>
</div>

  );
};

export default AdminDashboard;
