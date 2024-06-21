import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { createBrowserRouter } from "react-router-dom"
import CreateRoom from "@/pages/CreateRoom"
import JoinRoom from "@/pages/JoinRoom"
import Meet from "@/pages/Meet"
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: 'create',
        element: <CreateRoom />
    },
    {
        path: "join",
        element: <JoinRoom />
    },
    {
        path: "meet/:id",
        element: <Meet />
    }
])
export default router