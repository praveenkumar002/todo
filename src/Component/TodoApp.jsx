import "../Style/todoApp.css";
import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";


// let num;
function TodoApp({email}) {
  console.log(email);
  const [todoList, setTodoList] = useState([]);
  const [usertaskName, setUserTaskName] = useState("");
  const [loading, setLoading] = useState(true);
  //
  useEffect(() => {
    const q = query(collection(db, `${email}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoListArray = [];
      querySnapshot.forEach((doc) => {
        todoListArray.push({ ...doc.data(), id: doc.id });
      });
      setTodoList(todoListArray);
    });

    todoList.forEach((list) => {
      if (list.completion === true) {
        document.getElementById("todoCheckBox" + list.id).checked = true;
      } else if (list.completion === false) {
        document.getElementById("todoCheckBox" + list.id).checked = false;
      }
    });

    return () => unsubscribe();
  }, [todoList]);
  //

  const handleSubmit = async (event) => {
    event.preventDefault(event);
    if (usertaskName === "") {
      document.getElementById("emptyTask").style.display = "inline-block";
      setTimeout(() => {
        document.getElementById("emptyTask").style.display = "none";
      }, 4000);
    } else {
      await addDoc(collection(db, `${email}`), {
        taskName: usertaskName,
        completion: false,
      });
    }
    setUserTaskName("");
  };

  const handleDelete = async (deleteId) => {
    await deleteDoc(doc(db, `${email}`, deleteId));
  };

  const handleCheckBox = async (list) => {
    await updateDoc(doc(db, `${email}`, list.id), {
      completion: !list.completion,
    });
  };

  return (
    <section className="section">
      <form className="todoForm">
        <input
          type="text"
          value={usertaskName}
          placeholder="Task"
          onChange={(event) => {
            setUserTaskName(event.target.value);
            event.preventDefault();
          }}
          className="todoInput"
        />
        <input
          type="submit"
          value="+"
          className="todoSubmit"
          onClick={handleSubmit}
        />
      </form>
      {todoList.length ? (
        todoList.map((list) => (
          <aside className={"aside" + list.completion} key={list.id}>
            <input
              id={"todoCheckBox" + list.id}
              type="checkbox"
              className="todoCheckBox"
              value={list.completion}
              onChange={() => handleCheckBox(list)}
            />
            <h1 className={"todoTaskName" + list.completion}>
              {list.taskName}
            </h1>
            <button
              className={"todoDeleteButton" + list.completion}
              onClick={() => handleDelete(list.id)}
            >
              <Trash size={34} weight="fill" color="red" />
            </button>
          </aside>
        ))
      ) : (
        <h1 className="todoTaskNamefalse" style={{ color: "white" }}>
          No tasks to display
        </h1>
      )}

      <p id="emptyTask" className="emptyTask">
        please type the task...
      </p>
    </section>
  );
}

export default TodoApp;
