import { useState, useEffect, useContext } from "react";
import { AppState } from "../App";
import axios from "../axiosConfig";
import "./UserProfile.css";

function UserProfile() {
  const { user } = useContext(AppState);
  const [userQuestions, setUserQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user.userid) {
      fetchUserQuestions();
    }
  }, [user.userid, token]);

  const fetchUserQuestions = async () => {
    try {
      const response = await axios.get(`/questions/user/${user.userid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error fetching user questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        <div className="user-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "Email not available"}
          </p>
        </div>
      </div>

      <div className="user-questions">
        <h3>Your Questions</h3>
        {userQuestions.length > 0 ? (
          userQuestions.map((question) => (
            <div
              key={question.question_id || question.id}
              className="question-item"
            >
              <h4>{question.title}</h4>
              <p>{question.description}</p>
              <small>
                Posted on:{" "}
                {question.created_at
                  ? new Date(question.created_at).toLocaleDateString()
                  : "Date not available"}
              </small>
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
