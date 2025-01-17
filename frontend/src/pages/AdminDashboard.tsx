import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const AdminDashboard = () => {
  const [allUser, setAllUser] = useState(true);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [accountVerified, setAccountVerified] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [searchByBatchs, setSearchByBatchs] = useState([]);
  const [searchByDepartments, setSearchByDepartments] = useState([]);
  const [searchByCourses, setSearchByCourses] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState<Object[]>([]);

  const fetchUsers = async () => {
    const response = await axios.post<{ data: Object[] }>(
      `api/v1/admin/dashboard/users?allUser=${allUser}name=${name}&page=${page}&accountVerified=${accountVerified}&isRejected=${isRejected}`,
      { searchByBatchs, searchByDepartments, searchByCourses }
    );
    setFetchedUsers(response.data.data);
  };
  const changePage = ({ change }: any) => {
    if(page+change>0){
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

  return (
    <div className="bg-slate-500">
      AdminDashboard
      <aside>filters</aside>
      <div>
        <label htmlFor="name">
          Search by name
        <input type="text" name="name" id="name" onChange={(e)=>{
          setName(e.target.value)
        }} />
        </label>
        <select name="userType" id="userType" onChange={(e)=>{
          if(e.target.value=="all"){
            setAllUser(true);
          }
          if(e.target.value=='verified'){
            setAccountVerified(true)
          }
          if(e.target.value=='notVerified'){
            setAccountVerified(false)
          }
        }}>
          <option value="all">All Users</option>
          <option value="verified">Verified Users</option>
          <option value="notVerified">Not Verified Users</option>
        </select>
        {!accountVerified && (
          <label htmlFor="rejectionStatus">
            Rejected Users
            <input type="checkbox" onChange={(e)=>{
              setIsRejected(e.target.checked)
            }}/>
          </label>
        )}
      </div>
      <div></div>
      <div>
        <button onClick={() => changePage(-1)}>Previous Page</button>
        <button onClick={() => changePage(1)}>{page + 1}</button>
        <button onClick={() => changePage(2)}>{page + 2}</button>
        <button onClick={() => changePage(3)}>{page + 3}</button>
        <button onClick={() => changePage(1)}>Next Page</button>
      </div>
      <div>
        {fetchedUsers.map((user, index) => (
          <div key={index}>{JSON.stringify(user)}</div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
