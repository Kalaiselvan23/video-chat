
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { SocketContextType, socketContext } from "@/providers/WebSocketProvider"

export default function CreateRoom() {
  const {createRoom}=useContext<SocketContextType>(socketContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Create a New Video Chat Room
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Set up a private video chat room for your team or friends.
          </p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="room-name">Room Name</Label>
              <Input id="room-name" placeholder="Enter a room name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="room-password">Room Password (optional)</Label>
              <Input id="room-password" type="password" placeholder="Enter a password" />
            </div>
            <Button type="submit" className="w-full" onClick={createRoom}>
              Create Room
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}