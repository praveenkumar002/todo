// react import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//firebase import
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

//icon pack import
import { Envelope, Password, SignIn, ArrowClockwise } from "phosphor-react";

// import css
import "../Style/login.css";

function Login() {
  //State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //navigate from react router dom
  const navigate = useNavigate();

  //Maintain login after effects in dom
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo", { state: { email: auth.currentUser.email } });
      }
    });
  }, []);

  //Method for Sign in
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

  //Method to handle forget password
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

  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        navigate("/todo", { state: { email: res.user.email } });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div
      style={{
        marginTop: "0px !important",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "64px",
      }}
    >
      <div
        id="GoogleSignin"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          marginBottom: "58px",
        }}
      >
        <a
          id="GoogleSigninC"
          style={{
            color: "white",
            fontStyle: "italic",
            fontFamily: "initial",
            letterSpacing: "2px",
            wordSpacing: "2px",
            borderRadius: "4px",
            padding: " 14px 20px",
            backgroundColor: "#3B5998",
            textDecoration: "none",
          }}
          href="https://praveenkumar002.github.io/todo/#/register"
          title="Register"
        >
          Create account ?
        </a>
        <a
          id="GoogleSigninG"
          style={{
            color: "white",
            fontStyle: "italic",
            fontFamily: "initial",
            letterSpacing: "2px",
            wordSpacing: "2px",
            border: "2px solid white",
            borderRadius: "4px",
            padding: " 12px 20px",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={signInWithGoogle}
          title="Sign iin with Google"
        >
          Sign in with Google
        </a>
      </div>

      <div
        id="hrLine"
        style={{ display: "flex", alignItems: "center", marginBottom: "58px" }}
      >
        <hr style={{ width: "150px" }} />
        <p style={{ color: "white", margin: "0px 12px" }}>or</p>
        <hr style={{ width: "150px" }} />
      </div>

      {/* heading */}
      <h1
        style={{
          color: "white",
          marginBottom: "28px",
          letterSpacing: "2px",
          fontFamily: "cursive",
        }}
      >
        Log in
      </h1>

      {/* form */}
      <form style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
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
          marginTop: "28px",
          padding: "8px 24px",
          border: "none",
          backgroundColor: "#111C2F",
          cursor: "pointer",
        }}
        onClick={handleSignIn}
      >
        <SignIn size={32} color="white" weight="fill" />
      </button>

      <button
        style={{
          color: "white",
          fontStyle: "italic",
          fontFamily: "initial",
          letterSpacing: "2px",
          wordSpacing: "2px",
          backgroundColor: "#111c2f",
          border: "none",
          marginTop: "28px",
          textDecoration: "underline",
          fontSize: "16px",
        }}
        onClick={handleForgetPassword}
        title="Enter mail id to get reset link"
      >
        &nbsp;Forget password ?
      </button>

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
