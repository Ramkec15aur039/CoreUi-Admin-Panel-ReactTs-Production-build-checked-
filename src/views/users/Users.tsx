import React, { useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import "./Users.css";
import * as BoxIcon from "react-icons/bi";
import * as RemixIcon from "react-icons/ri";
import { deleteUser } from "../../api/delete";
import EditUserForms from "./EditUser";
import { usersDataFn } from "./UsersData";
import Pagination from "../pagination/Pagination";
import User from "./User";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

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

const Users = (props: any) => {
  const [onClickRow, setOnClickRow] = useState(true);
  let data: any = props.userData;
  const [warning, setWarning] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [modelStateDelete, setModelStateDelete] = useState("");
  const [large, setLarge] = useState(false);
  const [userId, setUserId] = useState("");
  const [clickId, setClickId] = useState(false);
 

  const getApiDelete = () => {
    props.getUsersAfterDelete(props.apiPage);
    setWarning(false);
  };

  const getApiForEdit = () => {
    props.getApiUpdated(props.apiPage);
    setLarge(false);
  };

  //To Update values in UserData
  const userDataFunctionCall = usersDataFn(data);
  console.log("Props data array->", userDataFunctionCall);

  console.log("User ID from Users->", userId, clickId);

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Users
              <CButton
                color="success"
                className="buttonPosition"
                to="users/AddUserForms"
              >
                Add User
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={data}
                fields={[
                  { key: "name", _classes: "font-weight-bold" },
                  "createdAt",
                  "role",
                  "email",
                  "Actions",
                ]}
                hover
                striped
                itemsPerPage={5}
                onRowClick={(items) =>
                  onClickRow ? (setUserId(items.id), setClickId(true)) : null
                }
                clickableRows
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  Actions: (item, index) => {
                    return (
                      <td>
                        <CButton
                          color="success"
                          onClick={() => {
                            setSelectedUserData(item);
                            setLarge(!large);
                          }}
                          onMouseEnter={() => setOnClickRow(false)}
                          onMouseLeave={() => setOnClickRow(true)}
                          className="customPadding"
                        >
                          <BoxIcon.BiEdit size={20} />
                        </CButton>

                        <CButton
                          onClick={() => {
                            setModelStateDelete(
                              "Are you sure want to delete!!!"
                            );
                            setWarning(true);
                            setDeleteId(item.id);
                          }}
                          onMouseEnter={() => setOnClickRow(false)}
                          onMouseLeave={() => setOnClickRow(true)}
                          color="danger"
                        >
                          <RemixIcon.RiDeleteBin6Line size={20} />
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
              {props.totalResult > 5 ? (
                <Pagination
                  pages={props.pages}
                  nextPage={props.nextPage}
                  currentPage={props.currentPage}
                />
              ) : (
                ""
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/*********************** Model Delete User *************************/}
      {warning ? (
        <CModal
          show={warning}
          color="danger"
          onClose={() => setWarning(!warning)}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>{modelStateDelete}</CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={() => {
                setWarning(!warning);
                deleteUser(deleteId).then((res) => {
                  // console.log("Get in delete API running");
                  if (responseHandler(res)) {
                    getApiDelete();
                  }
                });
                setDeleteId("");
              }}
            >
              Yes
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                setWarning(!warning);
                setDeleteId("");
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      ) : null}

      {/******************* Model Edit User **********************/}
      {large ? (
        <CModal
          show={large}
          color="warning"
          onClose={() => setLarge(!large)}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>Update User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <EditUserForms
              userData={selectedUserData}
              getUpdatedData={getApiForEdit}
            />
          </CModalBody>
          <CModalFooter></CModalFooter>
        </CModal>
      ) : null}

      {/******************* Model User on Row-Click **********************/}
      {clickId ? (
        <CModal
          show={clickId}
          color="info"
          onClose={() => setClickId(!clickId)}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle>User Id: {userId}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <User userId={userId} />
          </CModalBody>
          <CModalFooter></CModalFooter>
        </CModal>
      ) : null}
    </>
  );
};

export default Users;
