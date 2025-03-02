import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { AppState } from "../App";
import "./Answer.css";

function Answer() {
  const { user } = useContext(AppState);
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadQuestionAndAnswers();
  }, [questionid]);

  const loadQuestionAndAnswers = async () => {
    try {
      // Remove /api since it's already in baseURL
      const questionResponse = await axios.get(`/questions/${questionid}`);
      setQuestion(questionResponse.data.question);

      const answersResponse = await axios.get(`/answers/${questionid}`);
      setAnswers(answersResponse.data.answers || []);
      setError("");
    } catch (error) {
      console.log("API Error:", error.response?.data);
      setError("Failed to load question and answers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const response = await axios.post(
        "/answers",
        {
          answer: newAnswer.trim(),
          questionid: parseInt(questionid), // Changed from question_id to questionid
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setNewAnswer("");
        await loadQuestionAndAnswers();
      }
    } catch (error) {
      console.log("Submit error:", error);
      setError("Failed to post answer");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="answer-container">
      {error && <div className="error-message">{error}</div>}

      {question && (
        <div className="question-section">
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <small>Asked by: {question.user_name}</small>
        </div>
      )}

      <div className="answers-section">
        <h3>Answers ({answers.length})</h3>
        {answers.map((answer) => (
          <div key={answer.answerid} className="answer-item">
            <p>{answer.answer}</p>
            <small>Answered by: {answer.user_name}</small>
          </div>
        ))}
      </div>

      <div className="answer-form">
        <h3>Your Answer</h3>
        <form onSubmit={handleSubmitAnswer}>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer..."
            required
          />
          <button type="submit">Post Answer</button>
        </form>
      </div>
    </div>
  );
}

export default Answer;
