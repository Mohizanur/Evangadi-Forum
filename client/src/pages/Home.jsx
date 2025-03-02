import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axios from "../axiosConfig";
import "./Home.css";

function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.questions) {
        setQuestions(response.data.questions);
        setMessage("");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Failed to fetch questions. Please try again.");
    }
  };

  const validateQuestion = () => {
    if (newQuestion.title.length < 15) {
      setMessage("Question title must be at least 15 characters long");
      return false;
    }
    if (newQuestion.description.length < 30) {
      setMessage("Question description must be at least 30 characters long");
      return false;
    }
    return true;
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!validateQuestion()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "/questions",
        {
          title: newQuestion.title.trim(),
          description: newQuestion.description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setShowAskQuestion(false);
        setNewQuestion({ title: "", description: "" });
        await fetchQuestions();
        setMessage("Question posted successfully!");
      }
    } catch (error) {
      console.log("Error details:", error.response?.data);
      setMessage(error.response?.data?.message || "Failed to post question");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-container">
      <div className="questions-header">
        <h2>Questions</h2>
        <button
          onClick={() => setShowAskQuestion(true)}
          className="ask-button"
          disabled={isSubmitting}
        >
          Ask Question
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {message && <div className="message">{message}</div>}

      {showAskQuestion && (
        <div className="ask-question-form">
          <h3>Ask a Question</h3>
          <form onSubmit={handleSubmitQuestion}>
            <input
              type="text"
              placeholder="Question Title (minimum 15 characters)"
              value={newQuestion.title}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
              required
              minLength={15}
            />
            <textarea
              placeholder="Question Description (minimum 30 characters)"
              value={newQuestion.description}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, description: e.target.value })
              }
              required
              minLength={30}
            />
            <div className="form-buttons">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Submit Question"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAskQuestion(false);
                  setMessage("");
                }}
                className="cancel-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="questions-list">
        {currentQuestions.map((question) => (
          <div key={question.questionid} className="question-card">
            <h3>
              <Link to={`/answer/${question.questionid}`}>
                {question.title}
              </Link>
            </h3>
            <p>{question.description}</p>
            <div className="question-meta">
              <span>Asked by: {question.user_name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
