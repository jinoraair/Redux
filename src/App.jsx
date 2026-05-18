import DisplayTodos from "./components/DisplayTodos.jsx";
import Todos from "./components/Todos.jsx";

function App() {
  return (
    <main className="app">
      <section className="todo-shell" aria-label="Список задач">
        <div className="app-header">
          <p className="eyebrow">Redux Toolkit</p>
          <h1>Список дел</h1>
        </div>
        <Todos />
        <DisplayTodos />
      </section>
    </main>
  );
}

export default App;
