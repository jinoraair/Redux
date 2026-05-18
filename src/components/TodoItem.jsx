import { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const inputRef = useRef(null);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      updateTodo({ id, item: value.trim() || item.item });
      inputRef.current.disabled = true;
    }
  };

  return (
    <>
      <textarea
        ref={inputRef}
        disabled
        defaultValue={item.item}
        onKeyDown={(e) => update(item.id, inputRef.current.value, e)}
        className={item.completed ? "todo-text completed-text" : "todo-text"}
        aria-label="Текст задачи"
      />
      <div className="btns">
        <button onClick={() => changeFocus()} aria-label="Редактировать">
          <AiFillEdit />
        </button>
        <button
          className={item.completed ? "return-btn" : "done-btn"}
          onClick={() => completeTodo(item.id)}
          aria-label={item.completed ? "Вернуть в активные" : "Выполнено"}
          title={item.completed ? "Вернуть в активные" : "Выполнено"}
        >
          <IoCheckmarkDoneSharp />
        </button>
        <button
          className="remove-btn"
          onClick={() => removeTodo(item.id)}
          aria-label="Удалить"
        >
          <IoClose />
        </button>
      </div>
      {item.completed && <span className="completed">готово</span>}
    </>
  );
};

export default TodoItem;
