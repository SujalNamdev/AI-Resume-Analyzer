import { useState, useEffect, useContext } from "react";
import styles from "./History.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../../utiles/HOC/withAuthHOC";
import axios from "../../utiles/axios";
import { AuthContext } from "../../utiles/AuthContext";

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!userInfo?._id) return;

    const fetchUserData = async () => {
      setLoader(true);

      try {
        const results = await axios.get(`/api/resume/get/${userInfo._id}`);
        setData(results.data.resumes);
      } catch (err) {
        alert("Something Went Wrong");
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, [userInfo?._id]);

  return (
    <div className={styles.History}>
      {" "}
      <div className={styles.HistoryCardBlock}>
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
              className={`${styles.HistoryCard} ${
                expandedCard === item._id ? styles.expanded : ""
              }`}
            >
              <div className={styles.cardPercentage}>{item.score}%</div>

              <p>Resume Name : {item.resume_name}</p>

              <p
                className={`${styles.feedback} ${
                  expandedCard === item._id ? styles.feedbackExpanded : ""
                }`}
              >
                {item.feedback}
              </p>

              <p>
                Date:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-IN")
                  : "Date not available"}
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

export default WithAuthHOC(History);
