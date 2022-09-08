import { useState } from "react";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
  
  
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const {loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCLick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (e) {
      dispatch({ type: "LOGIN_FAILUE", payload: e.response.data });
    }
  };



  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          placeholder="email"
          onChange={handleChange}
          className="lInput"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="lInput"
          id="password"
        />
        <button disabled={loading} onClick={handleCLick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
