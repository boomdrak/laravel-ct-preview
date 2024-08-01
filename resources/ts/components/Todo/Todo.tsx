import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { AddTodo } from '@/components/Todo/AddTodo';
import { Switcher } from '@/components/Switcher/Switcher';
import { deleteTodo, getTodos, updateTodo } from '@/api/todo';
import { TodoType } from '@/types/todoType';
import { GrFormEdit } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { apiReturn } from '@/types/apiReturn';
import Loader from '@/common/Loader';

export const Todo = () => {
  const [cookies] = useCookies(['access_token']);
  const [loading, setLoading] = useState<boolean>(true);

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoMode, setnewTodoMode] = useState(false);
  const [editTask, setEditTask] = useState<number | null>();

  async function queryTasks() {
    let tasks: TodoType[] | apiReturn = await getTodos(cookies.access_token);
    setLoading(false);
    if (tasks as TodoType[]) {
      tasks = tasks as TodoType[];
      setTodos(tasks);
    } else {
      const error = tasks as apiReturn;
      toast.error(`Fetching todo failed..: ${error.message}`);
    }
  }

  useEffect(() => {
    setEditTask(null);
    queryTasks();
  }, []);

  const todoChange = (
    e: React.FormEvent<HTMLInputElement>,
    inputType: string
  ) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const objIndex = todos.findIndex(obj => obj.id == Number(id));
    const currentObj = todos[objIndex];

    const key = inputType;

    const updatedRecord = { ...currentObj, [key]: value };
    todos[objIndex] = updatedRecord;
    setTodos(() => [...todos]);
  };

  const submitChange = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    const update = await updateTodo(
      cookies.access_token,
      todos[todos.findIndex(obj => obj.id == Number(id))]
    );
    if (update.httpCode === 200) {
      toast.success(update.message);
      setEditTask(null);
    } else {
      toast.error(update.message);
    }
  };

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    setEditTask(Number(id));
  };

  const submitDeleteTodo = async (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    const deleteTask: apiReturn = await deleteTodo(
      cookies.access_token,
      Number(id)
    );
    if (deleteTask.success) {
      queryTasks();
      toast.success(deleteTask.message);
    } else {
      toast.error(deleteTask.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <button
            className="flex justify-center rounded bg-green-400 py-2 px-6 mb-5 font-medium text-gray hover:bg-opacity-90"
            onClick={() => {
              setnewTodoMode(true);
            }}
          >
            Add new task
          </button>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Completed
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody>
              <AddTodo
                addNewMode={newTodoMode}
                setnewTodoMode={setnewTodoMode}
                queryTasks={queryTasks}
              />
              {todos.map((todo, index) => {
                if (todo.id == editTask) {
                  return (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <input
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          id={todo.id.toString()}
                          value={todo.task_name}
                          onChange={e => {
                            todoChange(e, 'task_name');
                          }}
                        ></input>
                        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {todo.task_name.length === 0 && (
                            <div>Task name required</div>
                          )}
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <input
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          id={todo.id.toString()}
                          value={todo.task_description}
                          onChange={e => {
                            todoChange(e, 'task_description');
                          }}
                        ></input>
                        <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {todo.task_description.length === 0 && (
                            <div>Task description required</div>
                          )}
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <Switcher todo={todo} />
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={submitChange}
                            id={todo.id.toString()}
                          >
                            <IoSaveOutline />
                          </button>
                          <button onClick={() => setEditTask(null)}>
                            <MdOutlineCancel />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={nanoid()}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {todo.user.name} -- {todo.task_name}
                      </h5>
                      <p className="text-sm">${todo.task_description}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {todo.task_description}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          todo.task_completed
                            ? 'bg-success text-success'
                            : !todo.task_completed
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                        }`}
                      >
                        {todo.task_completed ? 'Yes' : 'No'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5"></div>
                      <FormActionButtons
                        onClick={handleChange}
                        id={todo.id.toString()}
                        canChange={editTask === null}
                        deleteTodo={submitDeleteTodo}
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {moment(todo.created_at).format('DD.MM.YYYY')}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

interface CanEditButtons {
  id: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  deleteTodo: (event: React.MouseEvent<HTMLElement>) => void;
  canChange: boolean;
}
const FormActionButtons = (Props: CanEditButtons) => {
  if (Props.canChange) {
    return (
      <>
        <button onClick={Props.onClick} id={Props.id}>
          <GrFormEdit />
        </button>
        <button
          className="hover:text-primary"
          onClick={Props.deleteTodo}
          id={Props.id}
        >
          <MdOutlineDeleteOutline />
        </button>
      </>
    );
  }
};
