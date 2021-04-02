import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {logoNegative} from "../assets/icons/logo-negative";
import {sygnet} from "../assets/icons/sygnet";
import {RootState} from "../redux/reducers";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show:any = useSelector((state: RootState) => state.change_State.sidebarShow)
  console.log("Redux:",show);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          content={logoNegative}
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          content={sygnet}
          height={35}
        />
        {/* <FontAwesomeIcon icon={faCoffee} /> */}
        {/* <img src="logo.gif" alt="Logo" width="200px" height="50px"/> */}
        {/* <FontAwesomeIcon icon={faBacteria} /> */}
        {/* <h5>Sample TypeScript Template</h5> */}
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
