import { TodoType } from '@/types/todoType';
import { useState } from 'react';

export const Switcher = ({ todo }: { todo: TodoType }) => {
  const [enabled, setEnabled] = useState(todo.task_completed);

  const toogleTaskComplete = (task_completed: boolean) => {
    if (task_completed) {
      todo.task_completed = true;
      setEnabled(true);
    }
    if (!task_completed) {
      todo.task_completed = false;
      setEnabled(false);
    }
  };

  return (
    // eslint-disable-next-line react/no-unknown-property
    <div x-data="{ switcherToggle: false }">
      <label
        htmlFor="toggle2"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id="toggle2"
            type="checkbox"
            className="sr-only"
            onChange={() => {
              toogleTaskComplete(!enabled);
            }}
          />
          <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${
              enabled && '!right-0 !translate-x-full !bg-primary dark:!bg-white'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
