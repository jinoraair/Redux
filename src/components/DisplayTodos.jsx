import { useMemo, useState } from "react";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer.js";
import TodoItem from "./TodoItem.jsx";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const filters = [
  { id: "active", label: "Активные" },
  { id: "completed", label: "Выполненные" },
  { id: "all", label: "Все" },
];

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");

  const visibleTodos = useMemo(() => {
    if (sort === "active") {
      return props.todos.filter((item) => !item.completed);
    }

    if (sort === "completed") {
      return props.todos.filter((item) => item.completed);
    }

    return props.todos;
  }, [props.todos, sort]);

  return (
    <div className="displaytodos">
      <div className="buttons" role="group" aria-label="Фильтр задач">
        {filters.map((filter) => (
          <button
            className={sort === filter.id ? "is-active" : ""}
            key={filter.id}
            onClick={() => setSort(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <ul>
        <AnimatePresence mode="popLayout">
          {visibleTodos.map((item) => (
            <motion.li
              className="card"
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -24 }}
            >
              <TodoItem
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {visibleTodos.length === 0 && (
        <p className="empty-state">Задач в этом списке пока нет</p>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
