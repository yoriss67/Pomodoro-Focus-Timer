import React, { useState } from 'react';

type Todo = {
  id: number;
  inputValue: string;
  checked: boolean;
  completedAt?: Date; // This property will hold the time of task completion.
};

type HistoryProps = {
  history: Todo[];
};

//
const History: React.FC<HistoryProps> = ({ history }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  // https://bootstrapious.com/p/bootstrap-sidebar

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // return (
  //   <div className="history">
  //     <h2>Completed Tasks</h2>
  //     <ul className="completedList">
  //       {history.map((todo) => (
  //         <li key={todo.id} className="completedTodo">
  //           <input type="checkbox" name="" id="" checked/>
  //           <p>{todo.inputValue}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div className={`history ${isSidebarOpen ? 'open' : 'close'}`}>
      <button className={`historyButton ${isSidebarOpen ? 'opened' : 'closed'}`} onClick={toggleSidebar}>
        {isSidebarOpen ? ' ' : '  '}
      </button>
      <h2 className={`completedTasks ${isSidebarOpen ? 'open' : 'close'}`}>Completed Tasks</h2>
      <ul className={`completedList ${isSidebarOpen ? 'open' : 'close'}`}>
        {/* {history.map((todo) => (
          <li key={todo.id} className="completedTodo">
            <img className="check" src="check.svg" alt="" />
            <p>{todo.inputValue}</p>
            {todo.completedAt && 
              <p>
                {todo.completedAt.getHours()}: {todo.completedAt.getMinutes()} 
                {todo.completedAt.getMonth() + 1} {todo.completedAt.getFullYear()}
              </p>
            }
          </li>
        ))} */}
        {history.map((todo) => (
          <li key={todo.id} className="completedTodo">
            <img className="check" src="check.svg" alt="" />
            
            <div className="todoText">
              <p>{todo.inputValue}</p>
              {todo.completedAt && (
                <p className="date">
                  {todo.completedAt.getHours()}:{todo.completedAt.getMinutes()} {monthNames[todo.completedAt.getMonth()]}{' '}
                  /{todo.completedAt.getFullYear()}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
