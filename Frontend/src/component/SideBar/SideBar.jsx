import React, { useContext } from "react";
import styles from "./SideBar.module.css";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utiles/AuthContext";

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.sideBar}>
        <div className={styles.navBar}>
          <div className={styles.navContainer}>
            <div>
              <img
                className={styles.profileImg}
                src={userInfo?.photoUrl}
                alt="user img"
              />
            </div>
            <div onClick={handleLogout} className={styles.sideBarOption}>
              <LogoutIcon></LogoutIcon>
              <div sx={{ fontSize: 22 }}>Logout</div>
            </div>
          </div>
        </div>

        <div className={styles.DashboardRightTopCard}>
          <img
            className={styles.profileImg}
            src={userInfo?.photoUrl}
            alt="user img"
          />
          <h2>{userInfo?.name}</h2>
        </div>

        <div className={styles.sideBarOptionBlock}>
          <Link
            to={"/dashboard"}
            className={[
              styles.sideBarOption,
              location.pathname === "/dashboard" ? styles.selectedOption : null,
            ].join(" ")}
          >
            <DashboardIcon></DashboardIcon>
            <div sx={{ fontSize: 22 }}>Dashboard</div>
          </Link>

          <Link
            to={"/history"}
            className={[
              styles.sideBarOption,
              location.pathname === "/history" ? styles.selectedOption : null,
            ].join(" ")}
          >
            <ManageHistoryIcon></ManageHistoryIcon>
            <div sx={{ fontSize: 22 }}>History</div>
          </Link>
          {userInfo?.role === "admin" && (
            <Link
              to={"/admin"}
              className={[
                styles.sideBarOption,
                location.pathname === "/admin" ? styles.selectedOption : null,
              ].join(" ")}
            >
              <ManageAccountsIcon />
              <div sx={{ fontSize: 22 }}>Admin</div>
            </Link>
          )}
          <div onClick={handleLogout} className={styles.sideBarOption}>
            <LogoutIcon></LogoutIcon>
            <div sx={{ fontSize: 22 }}>LogOut</div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.footer}>
          <Link
            to={"/dashboard"}
            className={[
              styles.sideBarOption,
              location.pathname === "/dashboard" ? styles.selectedOption : null,
            ].join(" ")}
          >
            <DashboardIcon></DashboardIcon>
          </Link>

          <Link
            to={"/history"}
            className={[
              styles.sideBarOption,
              location.pathname === "/history" ? styles.selectedOption : null,
            ].join(" ")}
          >
            <ManageHistoryIcon></ManageHistoryIcon>
          </Link>
          {userInfo?.role === "admin" && (
            <Link
              to={"/admin"}
              className={[
                styles.sideBarOption,
                location.pathname === "/admin" ? styles.selectedOption : null,
              ].join(" ")}
            >
              <ManageAccountsIcon />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
