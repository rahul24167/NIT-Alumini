import { useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce";

const AdminDashboard = () => {
  const [allUser, setAllUser]=useState(true);
  const [name,setName]=useState('');
  const [page,setPage]=useState(1);
  const [accountVerified,setAccountVerified]=useState(false);
  const [isRejected,setIsRejected]=useState(false);
  const [searchByBatchs,setSearchByBatchs]= useState([]);
  const [searchByDepartments,setSearchByDepartments] = useState([]);
  const [searchByCourses,setSearchByCourses] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState<Object[]>([]);

  const fetchUsers= async ()=>{
    const response = await axios.post<{ data: Object[] }>(`api/v1/admin/dashboard/users?allUser=${allUser}name=${name}&page=${page}&accountVerified=${accountVerified}&isRejected=${isRejected}`,
      { searchByBatchs, searchByDepartments, searchByCourses }
    )
    setFetchedUsers(response.data.data);

  }
  useDebounce(
    fetchUsers,
    [allUser,name, page, accountVerified, isRejected, searchByBatchs, searchByDepartments, searchByCourses],
    500
  );

  return (
    <div>AdminDashboard
      

      <div>fetchedUsers</div>
      
    </div>
  )
}

export default AdminDashboard