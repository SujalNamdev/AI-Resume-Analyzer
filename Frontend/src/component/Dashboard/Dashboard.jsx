import styles from "./Dashboard.module.css";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utiles/HOC/withAuthHOC";
import { useState } from "react";
import axios from "../../utiles/axios";
import { useContext } from "react";
import { AuthContext } from "../../utiles/AuthContext";

const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };

  const handleUpload = async () => {
    setResult(null);

    if (!jobDesc || !resumeFile) {
      alert("Please fill Job Description & Upload Resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);

    setLoading(true);

    try {
      const result = await axios.post("/api/resume/addResume", formData);
      setResult(result.data.data);
    } catch (err) {
      console.error("Analyze Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something Went Wrong. Please Try Again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      {" "}
      <div className={styles.DashboardLeft}>
        {" "}
        <div className={styles.DashboardHeader}>
          {" "}
          <div className={styles.DashboardHeaderTitle}>
            Land Your Next Job with AI{" "}
          </div>
          <div className={styles.DashboardHeaderLargeTitle}>
            Analyze your resume against any job description and get personalized
            insights, ATS scores, and improvement suggestions in seconds.
          </div>
        </div>
        <div className={styles.alertInfo}>
          <div>Important Instructions:</div>

          <div className={styles.dashboardInstruction}>
            <div>
              Please paste the complete job description in the "Job Description"
              field block.
            </div>

            <div>Only PDF format(.pdf) resume are accepted.</div>
          </div>
        </div>
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>{uploadFiletext}</div>

          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              Upload Here
            </label>

            <input
              type="file"
              accept=".pdf"
              id="inputField"
              onChange={handleOnChangeFile}
            />
          </div>
        </div>
        <div className={styles.jobDesc}>
          <textarea
            value={jobDesc}
            onChange={(e) => {
              setJobDesc(e.target.value);
            }}
            className={styles.textArea}
            placeholder="Paste Your Job Description"
            rows={15}
            cols={50}
          ></textarea>

          <div className={styles.btn}>
            <div className={styles.AnaylzeBtn} onClick={handleUpload}>
              Analyze
            </div>
          </div>
        </div>
      </div>
      <div className={styles.DashboardRight}>
        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>Result</div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <h1>{result?.score}%</h1>
              <AssessmentIcon sx={{ fontSize: 22 }} />
            </div>

            <div className={styles.feedback}>
              <h3>Feedback</h3>
              <p>{result?.feedback}</p>
            </div>
          </div>
        )}

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20px" }}
            width={280}
            height={280}
          />
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);
