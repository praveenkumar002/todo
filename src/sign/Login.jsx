import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo", { state: { email: auth.currentUser.email } });
      }
    });
  }, []);
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/todo", { state: { email: auth.currentUser.email } });
      })
      .catch((err) => alert(err.message));
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
          <div style={{ color: "white" }}>Email : </div>
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
          <div style={{ color: "white" }}>password : </div>
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
      </form>

      <button
        style={{
          color: "white",
          letterSpacing: "1px",
          fontSize:"14px",
          marginTop: "24px",
          padding: "8px 24px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#45a049",
        }}
        onClick={handleSignIn}
      >
        sign in
      </button>

      <a style={{marginTop:"24px", color:"white"}} href="https://praveenkumar002.github.io/todo/#/register">Create account?</a>
    </div>
  );
}

export default Login;
