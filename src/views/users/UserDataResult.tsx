import React, { useState, useEffect } from "react";
import { getUserList } from "../../api/list";
import Users from "./Users";

export default function UsersDataResult() {
  const [users, setUsers]: any = useState([]);
  const [rowsPerPage] = useState(5);
  const [page] = React.useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  console.log("Current Page:", currentPage);

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
        setUsers(res.results);
        setTotalResults(res.totalResults);
      }
    });
  };

  useEffect(() => {
    initialUserData();
    // eslint-disable-next-line
  }, []);

  //Pagination
  const nextPage = (currentPage) => {
    console.log("Next Page method working!!!", currentPage);
    getUserList({ currentPage, rowsPerPage }).then((res) => {
      if (responseHandler(res)) {
        res.results.forEach((item: any, index) => {
          item.name = item.firstName + " " + item.lastName;
          item.isActive = item.isActive === true ? "active" : "Not Active";
          return;
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
      }
    });
  };

  //Get users for after delete request
  const getUsersAfterDelete = (currentPage) => {
    console.log("Next Page method working!!!", currentPage);
    getUserList({ currentPage, rowsPerPage }).then((res) => {
      if (responseHandler(res)) {
        res.results.forEach((item: any, index) => {
          item.name = item.firstName + " " + item.lastName;
          item.isActive = item.isActive === true ? "active" : "Not Active";
          return;
        });
        setUsers(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
      }
    });
  };

  const numberPages = Math.floor(totalResults / 5);
  console.log("Number pages check:->", numberPages);

  return (
    <Users
      userData={users}
      totalResult={totalResults}
      getUsersAfterDelete={getUsersAfterDelete}
      apiPage={apiPage}
      pages={numberPages}
      nextPage={nextPage}
      currentPage={currentPage}
    />
  );
}
