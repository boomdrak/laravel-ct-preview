import { FunctionComponent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_URL } from '@/api/const';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import LoginSchema, { ZLoginSchema } from '@/zod/LoginSchema';
import { toast } from 'react-hot-toast';
import { apiReturn } from '@/types/apiReturn';

export const SignInForm: FunctionComponent = () => {
  const [, setCookie] = useCookies(['access_token']);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ZLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ZLoginSchema> = async data => {
    let response: AxiosResponse;

    try {
      const dataToSend = { email: data.email, password: data.password };
      response = await axios.post(`${API_URL}login`, dataToSend);
      toast.success(`Login successfull! Welcome, ${data.email}`);
      setCookie('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (e) {
      const error = e as AxiosError;
      const errorResponse = error.response as AxiosResponse;
      const apiReturn: apiReturn = {
        httpCode: error.response?.status || 400,
        message: JSON.stringify(errorResponse?.data?.message),
        success: false,
      };
      const formError = {
        type: 'server',
        message: 'Unknown error',
      };
      formError.message = apiReturn.message;
      toast.error(`Login failed..: ${formError.message}`);
      setError('serverError', formError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm"
          style={{ color: 'rgb(209 213 219' }}
        >
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="example@example.com"
          autoComplete="on"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {errors.email && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <label
            htmlFor="password"
            className="text-sm"
            style={{ color: 'rgb(209 213 219' }}
          >
            Password
          </label>
          <a
            href="#"
            className="text-sm text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <input
          {...register('password')}
          type="password"
          placeholder="Your Password"
          autoComplete="on"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {errors.password && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="py-2 px-4 flex justify-center items-center  bg-blue-500 hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
        >
          {isSubmitting && (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
          )}
          Sign in
        </button>
      </div>
      {errors.serverError && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.serverError.message}
        </span>
      )}
    </form>
  );
};
