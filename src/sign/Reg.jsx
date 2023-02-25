import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((err) => alert(err.message));
    } else {
      alert("password error");
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ color: "white" }}>email : </div>
          <input
            style={{
              width: "100%",
              padding: "4px",
              outline: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ color: "white" }}>password</div>
          <input
            style={{
              width: "100%",
              padding: "4px",
              outline: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ color: "white" }}>Confirm password : </div>
          <input
            style={{
              width: "100%",
              padding: "4px",
              outline: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      </form>

      <button
        style={{
          color: "white",
          letterSpacing: "1px",
          fontSize: "14px",
          marginTop: "24px",
          padding: "8px 24px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#45a049",
        }}
        onClick={handleRegister}
      >
        register
      </button>
      <a style={{marginTop:"24px", color:"white"}} href="/">sign in</a>
    </div>
  );
}

export default Register;
