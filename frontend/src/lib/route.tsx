import Home from "@/pages/Home"
import Login from "@/pages/Login"
import { createBrowserRouter } from "react-router-dom"
import Meet from "@/pages/Meet"
const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>,
    },
    {
        path:"meet/:id",
        element:<Meet/>
    }
])
export default router