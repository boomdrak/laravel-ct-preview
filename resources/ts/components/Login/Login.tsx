import { SignInForm } from '@/components/Login/SignInForm';

export default function Login() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover sm:block lg:w-5/6"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Laravel CoreTrek Code Preview
              </h2>
              <p
                className="max-w-xl mt-3 font-bold"
                style={{ color: 'rgb(209 213 219' }}
              >
                Demo project showcasing technical skills
              </p>
              <p className="" style={{ color: 'rgb(209 213 219' }}>
                Kenneth Hauklien{' '}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex items-center w-full px-6 mx-auto lg:w-2/6"
          style={{ backgroundColor: '#141826' }}
        >
          <div className="flex-1">
            <div className="text-center">
              <div className="text-5xl font-extrabold ...">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  Todo, or not todo
                </span>
              </div>
              {/* <h2
                className="text-4xl font-bold text-center"
                style={{ color: 'rgb(209 213 219' }}
              >
                Todo, or not todo
              </h2> */}
              <p className="mt-3" style={{ color: 'rgb(209 213 219' }}>
                Login
              </p>
            </div>
            <div className="mt-8">
              <SignInForm />
              <p
                className="mt-6 text-sm text-center"
                style={{ color: 'rgb(209 213 219' }}
              >
                Opprett gjerne en konto..:{' '}
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  her
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
