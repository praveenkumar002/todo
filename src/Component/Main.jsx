import { useEffect, useState } from "react";
import "../Style/main.css";
import TodoApp from "./TodoApp";
import Typed from "react-typed";
import { SignOut, User } from "phosphor-react";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());

  const [time, setTime] = useState(date.getHours());
  const [minute, setMinute] = useState(date.getMinutes());
  const [second, setSecond] = useState(date.getSeconds());
  const [message, setMessage] = useState("");

  const [day, setDay] = useState(date.getDay());
  const [weekDay] = useState([
    "Sunady...",
    "Monday...",
    "Tuesday...",
    "Wednesday...",
    "ThursDay...",
    "Friday...",
    "Saturday...",
  ]);
  const [dayName, setDayname] = useState(weekDay[day]);

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

  const location = useLocation();

  useEffect(() => {
    
    
    auth.onAuthStateChanged(user => {
      if(!user){
        navigate("/")
      }
    })
    const inte = setInterval(() => {
      setDate(new Date());
    }, 1000);

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

    setDay(date.getDay());
    setDayname(weekDay[day]);

    setMonth(date.getMonth());
    setMonthNow(monthName[month]);
    setDateNow(date.getDate());
    setYear(date.getFullYear());

    return () => {
      clearInterval(inte);
    };
  }, [date]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  return (
    <>
      <main className="main">
        <div className="sign">
          <div className="user">
            <User size={24} weight="fill" />
            &nbsp;<p>{`${location.state.email}`}</p>
          </div>
          <button onClick={handleSignOut}>
            <SignOut className="button" size={32} weight="fill" color="white" />
          </button>
        </div>

        {/*  */}

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
              <h3>Todo list</h3>
              <h5 className="time">
                {time}:{minute}:{second}
              </h5>
            </div>
          </div>
        </div>

        {/*  */}

        <hr style={{ margin: "32px 0px", color: "#ced4da" }} />

        {/*  */}

        <TodoApp email={location.state.email}/>
      </main>
    </>
  );
}
export default Main;
