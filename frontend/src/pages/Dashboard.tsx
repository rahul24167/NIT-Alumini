import { useState } from "react";

 // Add other properties as needed
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
//route protection for the dashboard
const Dashboard = () => {
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1); //will be used soon in the last diiv
  const [searchByBatchs, setSearchByBatchs] = useState<number[]>([]);
  const [searchByDepartments, setSearchByDepartments] = useState<string[]>([]);
  const [searchByCourses, setSearchByCourses] = useState<string[]>([]);
  // const [fetchedUsers, setFetchedUsers] = useState<Object[]>([]);

  const fetchUsers = async () => {
    const response = await axios.post<{ data: User[] }>(
      `api/v1/user/dashboard/users?name=${name}&page=${page}`,
      { searchByBatchs, searchByDepartments, searchByCourses }
    );
    setFetchedUsers(response.data.data);
  };
  const changePage = ({ change }: any) => {
    setPage((prev) => prev + change);
  };
  useDebounce(
    fetchUsers,
    [name, page, searchByBatchs, searchByDepartments, searchByCourses],
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
    <>
  {/* Search Input */}
  <div className="p-4 bg-gray-100 flex items-center gap-4">
    <label htmlFor="name" className="text-lg font-semibold">
      Search here:
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Rahul"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full max-w-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
    <button
      onClick={togglefilter}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      Filter
    </button>
  </div>

  {/* Filter Section */}
  <div className={`p-4 bg-gray-50 shadow-md ${filterVisible ? "block" : "hidden"}`}>
    <form>
      {/* Batches */}
      <fieldset className="mb-4">
        <legend className="text-lg font-semibold mb-2">Select Batches</legend>
        <div className="flex flex-wrap gap-4">
          {batchs.map((batch) => (
            <div key={batch} className="flex items-center">
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
                className="mr-2"
              />
              <label htmlFor={`${batch}`}>{batch}</label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Departments */}
      <fieldset className="mb-4">
        <legend className="text-lg font-semibold mb-2">Select Departments</legend>
        <div className="flex flex-wrap gap-4">
          {Object.entries(departments).map(([id, { shortName, fullName }]) => (
            <div key={id} className="flex items-center">
              <input
                id={shortName}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchByDepartments((prevItems) => [...prevItems, fullName]);
                  } else {
                    setSearchByDepartments((prevItems) =>
                      prevItems.filter((i) => i !== fullName)
                    );
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={shortName}>{fullName}</label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Courses */}
      <fieldset className="mb-4">
        <legend className="text-lg font-semibold mb-2">Select Courses</legend>
        <div className="flex flex-wrap gap-4">
          {Object.entries(courses).map(([id, courseName]) => (
            <div key={id} className="flex items-center">
              <input
                id={`course-${id}`}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchByCourses((prevItems) => [...prevItems, courseName]);
                  } else {
                    setSearchByCourses((prevItems) =>
                      prevItems.filter((i) => i !== courseName)
                    );
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`course-${id}`}>{courseName}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </form>
  </div>

  {/* Fetched Users */}
  <div className="p-4 bg-gray-100">
  <UserCard user={{
  id: 1,
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  photo: "https://via.placeholder.com/150", // Replace with an actual URL if available
  course: "Computer Science",
  department: "Engineering",
  batch: "2025",
}}/>
    <h2 className="text-lg font-semibold mb-4">Fetched Users</h2>
    <div className="space-y-2">
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

  {/* Pagination */}
  <div className="p-4 flex justify-center gap-2 bg-gray-50">
    <button
      onClick={() => changePage(-1)}
      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
    >
      Previous Page
    </button>
    <button
      onClick={() => changePage(1)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      {page + 1}
    </button>
    <button
      onClick={() => changePage(2)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      {page + 2}
    </button>
    <button
      onClick={() => changePage(3)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      {page + 3}
    </button>
    <button
      onClick={() => changePage(1)}
      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
    >
      Next Page
    </button>
  </div>
</>

  );
};

export default Dashboard;
