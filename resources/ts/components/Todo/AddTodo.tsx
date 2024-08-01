import React, { useState, Dispatch, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { NewTodo } from '@/types/todoType';
import { TodoType } from '@/types/todoType';
import { apiReturn } from '@/types/apiReturn';
import { IoSaveOutline } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { createTodo } from '@/api/todo';
import { toast } from 'react-hot-toast';

interface IAddTodoProps {
  addNewMode: boolean;
  setnewTodoMode: Dispatch<SetStateAction<boolean>>;
  queryTasks: Dispatch<SetStateAction<boolean>>;
}

export const AddTodo = (props: IAddTodoProps) => {
  const [todo, setTodo] = useState<NewTodo>({
    task_name: '',
    task_description: '',
  });
  const [cookies] = useCookies(['access_token']);

  const todoChange = (
    e: React.FormEvent<HTMLInputElement>,
    inputType: string
  ) => {
    const value = e.currentTarget.value;
    switch (inputType) {
      case 'task_name':
        todo.task_name = value;
        break;
      case 'task_description':
        todo.task_description = value;
        break;
    }
    const key = inputType;
    const updatedRecord: NewTodo = { ...todo, [key]: value };
    setTodo(() => updatedRecord);
  };

  const submitNewTodo = async () => {
    const tasks: TodoType[] | apiReturn = await createTodo(
      cookies.access_token,
      todo
    );
    if (tasks.success) {
      toast.success(tasks.message);
    } else {
      toast.error(tasks.message);
    }
    props.setnewTodoMode(false);
    props.queryTasks();
  };

  if (!props.addNewMode) return <></>;
  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          value={todo.task_name}
          onChange={e => {
            todoChange(e, 'task_name');
          }}
        ></input>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"></td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => {
              submitNewTodo();
            }}
          >
            <IoSaveOutline />
          </button>
          <button onClick={() => props.setnewTodoMode(false)}>
            <MdOutlineCancel />
          </button>
        </div>
      </td>
    </tr>
  );
};
