import ReactDOM from 'react-dom/client';
import Main from '@/Main';
import { BrowserRouter } from 'react-router-dom';
import '../css/app.css';
import { CookiesProvider } from 'react-cookie';

const targetElement = document.getElementById('root');
if (targetElement !== null) {
  const root = ReactDOM.createRoot(targetElement);
  root.render(
    <CookiesProvider defaultSetOptions={{ path: '/', secure: true }}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </CookiesProvider>
  );
}
