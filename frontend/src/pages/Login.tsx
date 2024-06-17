import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "@/icons/icon"
import { Button } from "@/components/ui/button"

export default function Login() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br px-4 py-12">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
                <div className="space-y-4 text-center">
                    <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        Video Chat
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Join our App</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
                </div>
                <form className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300"
                    >
                        Sign In
                    </Button>   
                </form>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <a href="#" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    )
}

