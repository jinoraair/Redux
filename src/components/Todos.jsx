import { useState } from "react";
import { connect } from "react-redux";
import { GoPlus } from "react-icons/go";
import { addTodos } from "../redux/reducer.js";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo.trim() === "") {
      alert("Введите текст задачи");
    } else {
      props.addTodo({
        id: crypto.randomUUID(),
        item: todo.trim(),
        completed: false,
      });
      setTodo("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
        className="todo-input"
        value={todo}
        placeholder="Новая задача"
        aria-label="Новая задача"
      />

      <button className="add-btn" onClick={() => add()} aria-label="Добавить">
        <GoPlus />
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
