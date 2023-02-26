import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Envelope, Password, SignIn, ArrowClockwise } from "phosphor-react";

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
      .catch((err) => {
        // alert(err.message)
        document.getElementById("wrongCre").innerHTML =
          "Please enter valid Username or Password.";
        document.getElementById("wrongCre").style.backgroundColor =
          "rgba(255, 0, 0, 0.39)";
        document.getElementById("wrongCre").style.display = "inline-block";
        setTimeout(() => {
          document.getElementById("wrongCre").style.display = "none";
        }, 5000);
      });
  };

  const handleForgetPassword = async () => {
    if (email === "") {
      document.getElementById("wrongCre").innerHTML =
        "Please enter valid mail id.";
      document.getElementById("wrongCre").style.backgroundColor =
        "rgba(255, 0, 0, 0.39)";
      document.getElementById("wrongCre").style.display = "inline-block";
      setTimeout(() => {
        document.getElementById("wrongCre").style.display = "none";
      }, 5000);
    } else {
      await sendPasswordResetEmail(auth, email).then(() => {
        document.getElementById("wrongCre").innerHTML =
          "Password Reset Email Has Been Sent";
        document.getElementById("wrongCre").style.backgroundColor = "#37b24e77";
        document.getElementById("wrongCre").style.display = "inline-block";
        setTimeout(() => {
          document.getElementById("wrongCre").style.display = "none";
        }, 5000);
      });
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
      <h1
        style={{
          color: "white",
          marginBottom: "38px",
          letterSpacing: "2px",
          fontFamily: "cursive",
        }}
      >
        Log in
      </h1>
      <form style={{ display: "flex", flexDirection: "column", gap: "38px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "14px" }}>
          <div
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Envelope size={32} color="#ffff" weight="fill" />
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

        <div style={{ display: "flex", flexDirection: "row", gap: "14px" }}>
          <div
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <Password size={32} color="#ffff" weight="fill" />
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
      </form>

      <button
        title="Login"
        style={{
          marginTop: "32px",
          padding: "8px 24px",
          border: "none",
          backgroundColor: "#111C2F",
          cursor: "pointer",
        }}
        onClick={handleSignIn}
      >
        <SignIn size={32} color="white" weight="fill" />
      </button>

      <a
        style={{
          marginTop: "34px",
          color: "white",
          fontStyle: "italic",
          fontFamily: "initial",
          letterSpacing: "2px",
          wordSpacing: "2px",
        }}
        href="https://praveenkumar002.github.io/todo/#/register"
        title="Register"
      >
        Create account ?
      </a>

      <div style={{ display: "flex", flexDirection: "row", gap: "2px", alignSelf:"center", cursor:"pointer", marginTop:"32px" }}>
        {/* <ArrowClockwise size={30} color="#ffff" weight="fill" /> */}
          <button
          style={{
            color: "white",
            fontStyle: "italic",
            fontFamily: "initial",
            backgroundColor:"#111C2F",
            fontSize: "18px",
            border:"none",
            cursor: "pointer",
            letterSpacing: "2px",
          wordSpacing: "2px",
          textDecoration:"underLine"
          }}
           onClick={handleForgetPassword}>&nbsp;Forget password ?</button>
        </div>

      <p
        id="wrongCre"
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
        Please enter valid Username or Password.
      </p>
    </div>
  );
}

export default Login;
