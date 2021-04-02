import React, { useState, useEffect } from "react";
import { getUserList } from "../../api/list";
import Users from "./Users";

export default function UsersDataResult() {
  const [users, setUsers]: any = useState([]);
  const [rowsPerPage] = React.useState(25);
  const [totalResults, setTotalResults] = useState(0);
  const [page] = React.useState(0);

  /***********************************Response Handler****************************************/
  const responseHandler = (res) => {
    if (res) {
      if (res.code) {
        if (res.code === 400) {
          //console.log(console.log(res.message));
          return false;
        } else {
          //console.log("Bad Request");
          return false;
        }
      } else if (res.error) {
        //console.log(res.error);
        return false;
      } else {
        return res;
      }
    } else {
      return false;
    }
  };

  const initialUserData = () => {
    let currentPage = page + 1;
    getUserList({ currentPage, rowsPerPage }).then((res) => {
      if (responseHandler(res)) {
        res.results.forEach((item: any, index) => {
          item.name = item.firstName + " " + item.lastName;
          item.isActive = item.isActive === true ? "active" : "Not Active";
          return;
        });
        setUsers(res.results.reverse());
        setTotalResults(res.totalResults);
      }
    });
  };

  useEffect(() => {
    initialUserData();
    // eslint-disable-next-line
  }, []);

  // Sample Redux
  console.log("Users from userDataResult:", users);
  console.log("Total Result from userDataResult:", totalResults);

  return <Users userData={users} getApiUpdated={initialUserData} />;
}
