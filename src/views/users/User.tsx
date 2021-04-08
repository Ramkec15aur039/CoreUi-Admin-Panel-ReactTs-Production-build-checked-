import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TestAction } from "../../redux/actions/testAction";
import { useDispatch } from "react-redux";
import { getUserById } from "../../api/list";

const User = (props: any) => {
  const [usersData, setUsersData]: any = useState([]);
  useEffect(() => {
    getUserById(props.userId).then((res) => {
      res.forEach((item) => {
        item.isActive = item.isActive === true ? "active" : "Not Active";
      });
      setUsersData(res);
    });
    // eslint-disable-next-line
  }, [props.userId]);
  const user = usersData.find((user) => user.id.toString() === props.userId);
  let userDetails: any = user
    ? Object.entries(user)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  //Sample Redux
  const dispatch = useDispatch();
  dispatch(TestAction());

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => {
                  return key !== "id" &&
                    key !== "isAdmin" &&
                    key !== "createdBy" &&
                    key !== "updatedBy" ? ( //Conditional mapping
                    <tr key={index.toString()}>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
