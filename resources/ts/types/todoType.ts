export type TodoType = {
  id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  task_name: string;
  task_description: string;
  task_completed: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type NewTodo = {
  task_name: string;
  task_description: string;
};
