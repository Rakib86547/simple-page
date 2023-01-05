import Home from "../pages/Home/Home/Home";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");

const router = createBrowserRouter([{
    path: '/',
    element: <Main />,
    children: [
        {
            path: '/',
            element: <Home />,
        }
    ]
}]);

export default router