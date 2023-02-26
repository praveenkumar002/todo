// react imports
import { useEffect, useState } from "react";
import Typed from "react-typed";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// firebase imports
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Icon imports
import { SignOut, User } from "phosphor-react";

// CSS import
import "../Style/main.css";

// AComponent import
import Footer from "./Footer";
import TodoApp from "./TodoApp";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState(new Date());

  // Time
  const [time, setTime] = useState(date.getHours());
  const [minute, setMinute] = useState(date.getMinutes());
  const [second, setSecond] = useState(date.getSeconds());

  // meassage
  const [message, setMessage] = useState("");

  // day number and day name
  const [day, setDay] = useState(date.getDay());
  const [weekDay] = useState([
    "Sunday...",
    "Monday...",
    "Tuesday...",
    "Wednesday...",
    "ThursDay...",
    "Friday...",
    "Saturday...",
  ]);
  const [dayName, setDayname] = useState(weekDay[day]);

  // Month number and month name, date, year
  const [month, setMonth] = useState(date.getMonth());
  const [monthName] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [monthNow, setMonthNow] = useState(monthName[month]);
  const [dateNow, setDateNow] = useState(date.getDate());
  const [year, setYear] = useState(date.getFullYear());

  // To maintain time, Day, Month, date, year, authentication
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });

    const inte = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // set time and message
    setTime(date.getHours());
    setMinute(date.getMinutes());
    setSecond(date.getSeconds());
    if (time < 12) {
      setMessage("Good Morning");
    } else if (time < 16) {
      setMessage("Good Afternoon");
    } else {
      setMessage("Good Evening");
    }

    // set day name
    setDay(date.getDay());
    setDayname(weekDay[day]);

    // set month, date, year
    setMonth(date.getMonth());
    setMonthNow(monthName[month]);
    setDateNow(date.getDate());
    setYear(date.getFullYear());

    return () => {
      clearInterval(inte);
    };
  }, [date]);

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [todoLength, setTodoLength] = useState(0);
  const listCount = (length) => {
    setTodoLength(length);
  };
  return (
    <>
      <main className="main">
        {/* username and logout header */}
        <div className="sign">
          <div className="user">
            <User size={24} weight="fill" color="#668ADD" />
            &nbsp;
            <p className="userName">
              {`${location.state.email}`.split(".")[0].split("@")[0]}
            </p>
          </div>
          <button onClick={handleSignOut}>
            <SignOut className="button" size={32} weight="fill" color="white" />
          </button>
        </div>

        {/* Time, Day, Month, date, Year */}
        <div className="mainHeader">
          <h1 className="mainHeaderGreeting">{message}</h1>

          <div className="mainHeaderDetailDiv">
            <div className="mainHeaderDates">
              <h4>
                Today's&nbsp;
                <Typed
                  style={{ color: "#e03131" }}
                  strings={[dayName]}
                  typeSpeed={200}
                  backSpeed={200}
                  loop
                />
              </h4>
              <h5 className="date">
                {monthNow}&nbsp;{dateNow},&nbsp;{year}
              </h5>
            </div>
            <div className="mainHeaderAppDet">
              <h3>{todoLength > 0 ? todoLength : "Todo"} lists</h3>
              <h5 className="time">
                {time}:{minute}:{second}
              </h5>
            </div>
          </div>
        </div>

        {/*  */}
        <hr style={{ margin: "32px 0px", color: "#ced4da" }} />

        {/* import Todo */}
        <TodoApp email={location.state.email} listCount={listCount} />
      </main>

      {/* import footer */}
      <Footer />
    </>
  );
}
export default Main;
