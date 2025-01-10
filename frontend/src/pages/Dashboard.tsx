import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const Dashboard = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1); //will be used soon in the last diiv
  const [searchByBatchs, setSearchByBatchs] = useState<number[]>([]);
  const [searchByDepartments, setSearchByDepartments] = useState<string[]>([]);
  const [searchByCourses, setSearchByCourses] = useState<string[]>([]);
  const [fetchedUsers, setFetchedUsers] = useState<Object[]>([]);

  const fetchUsers = async () => {
    const response = await axios.post<{ data: Object[] }>(
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
  useEffect(() => {
    let timerId = setTimeout(() => {
      // fetching
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [name, page, searchByBatchs, searchByDepartments, searchByCourses]);

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
      <div>
        <label htmlFor="name">Search here</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Rahul"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button onClick={togglefilter}>Filter</button>
      <div className={`${filterVisible ? "visible" : "hidden"}`}>
        {/* searchByBatchs=[], searchByDepartments=[], searchByCourses=[] */}
        <form>
          <fieldset>
            <legend>Select Batches</legend>
            <div className="flex flex-wrap">
              {batchs.map((batch) => (
                <div key={batch} className="block">
                  <label htmlFor={`${batch}`}>
                    {batch}
                    <input
                      id={`${batch}`}
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSearchByBatchs((prevItems) => [
                            ...prevItems,
                            batch,
                          ]);
                        } else {
                          setSearchByBatchs((prevItems) =>
                            prevItems.filter((i) => i !== batch)
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Select departments</legend>
            {Object.entries(departments).map(
              ([id, { shortName, fullName }]) => (
                <label key={id} htmlFor={shortName}>
                  {fullName}
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
                  />
                </label>
              )
            )}
          </fieldset>
          <fieldset>
            <legend>Select Courses</legend>
            {Object.entries(courses).map(([id, courseName]) => (
              <label key={id} htmlFor={`course-${id}`}>
                {courseName}
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
                />
              </label>
            ))}
          </fieldset>
        </form>
      </div>
      <div>
        {fetchedUsers.map((user, index) => (
          <div key={index}>{JSON.stringify(user)}</div>
        ))}
      </div>
      <div>
        <button onClick={() => changePage(-1)}>Previous Page</button>
        <button onClick={() => changePage(1)}>{page + 1}</button>
        <button onClick={() => changePage(2)}>{page + 2}</button>
        <button onClick={() => changePage(3)}>{page + 3}</button>
        <button onClick={() => changePage(1)}>Next Page</button>
      </div>
    </>
  );
};

export default Dashboard;
