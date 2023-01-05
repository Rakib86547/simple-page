import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/route';

function App() {
  return (
    <div className="max-w-[1280px] mx-auto">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
