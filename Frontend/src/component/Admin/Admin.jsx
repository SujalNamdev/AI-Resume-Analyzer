import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../../utiles/HOC/withAuthHOC";
import axios from "../../utiles/axios";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);
      try {
        const results = await axios.get("/api/resume/get");
        setData(results.data.resumes);
      } catch (err) {
        alert("Something Went Wrong");
      } finally {
        setLoader(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className={styles.Admin}>
      {" "}
      <div className={styles.AdminBlock}>
        {loader && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={500}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={500}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={500}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={266}
              height={500}
            />
          </>
        )}
        {data.map((item) => {
          return (
            <div
              key={item._id}
              className={`${styles.AdminCard} ${
                expandedCard === item._id ? styles.expanded : ""
              }`}
            >
              <h2>{item?.user?.name}</h2>

              <p style={{ color: "blue" }}>{item?.user?.email}</p>

              <h3>Score : {item.score}%</h3>

              <p>
                Uploaded Date:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-IN")
                  : "Date not available"}
              </p>

              <p
                className={`${styles.feedback} ${
                  expandedCard === item._id ? styles.feedbackExpanded : ""
                }`}
              >
                {item.feedback}
              </p>

              <button
                className={styles.seeMore}
                onClick={() =>
                  setExpandedCard(expandedCard === item._id ? null : item._id)
                }
              >
                {expandedCard === item._id ? "Close ↑" : "See More ↓"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);
