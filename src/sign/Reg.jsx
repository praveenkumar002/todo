import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Envelope, Password, Upload, Repeat } from "phosphor-react";

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
        .catch((err) => {
          document.getElementById("wrongEma").style.display = "inline-block";
          document.getElementById("wrongEma").innerHTML = err.message;

          setTimeout(() => {
            document.getElementById("wrongEma").style.display = "none";
          }, 3000);
          // alert(err.message)
        });
    } else {
      document.getElementById("wrongPas").style.display = "inline-block";
      setTimeout(() => {
        document.getElementById("wrongPas").style.display = "none";
      }, 3000);
      // alert("password error");
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
        width: "100%",
      }}
    >
      <h1
        style={{
          color: "white",
          marginBottom: "38px",
          letterSpacing: "2px",
          fontFamily: "cursive",
        }}
      >
        Sign up
      </h1>

      <form style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Envelope size={32} color="#ffff" weight="fill" />
            &nbsp;Email :
          </div>
          <input
            required
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

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Password size={32} color="#ffff" weight="fill" />
            &nbsp;Password :
          </div>
          <input
            required
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

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Repeat size={32} color="#ffff" weight="fill" />
            &nbsp;Confirm password :
          </div>
          <input
            required
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
        title="Register"
        style={{
          marginTop: "32px",
          padding: "8px 24px",
          border: "none",
          backgroundColor: "#111C2F",
          cursor: "pointer",
        }}
        onClick={handleRegister}
      >
        <Upload size={32} color="#ffff" weight="fill" />
      </button>
      <a
        style={{
          marginTop: "48px",
          color: "white",
          fontStyle: "italic",
          fontFamily: "initial",
          letterSpacing: "2px",
          wordSpacing: "2px",
        }}
        href="https://praveenkumar002.github.io/todo/"
        title="Login"
      >
        Already have an account?
      </a>

      <p
        id="wrongPas"
        style={{
          display: "none",
          backgroundColor: "rgba(255, 0, 0, 0.39)",
          fontFamily: "Impact",
          color: "white",
          padding: "8px 12px",
          borderRadius: "12px",
          position: "fixed",
          letterSpacing: "0.9px",
          top: "10px",
          left: "10%",
          right: "10%",
          textAlign: "center",
        }}
      >
        Password and Confirm Password must be same.
      </p>
      <p
        id="wrongEma"
        style={{
          display: "none",
          backgroundColor: "rgba(255, 0, 0, 0.39)",
          fontFamily: "Impact",
          color: "white",
          padding: "8px 12px",
          borderRadius: "12px",
          position: "fixed",
          letterSpacing: "0.9px",
          top: "10px",
          left: "10%",
          right: "10%",
          textAlign: "center",
        }}
      >
        Invalid email.
      </p>
    </div>
  );
}

export default Register;
