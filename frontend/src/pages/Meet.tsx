import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { SettingsIcon, UserIcon, MicIcon, VideoIcon, PhoneIcon, PlusIcon } from "@/icons/icon"
export default function Component() {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-950 text-gray-300 border-b border-gray-800 p-4 flex items-center justify-between">
                <div className="text-lg font-medium">Video Chat</div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                        <SettingsIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                        <UserIcon className="w-5 h-5" />
                    </Button>
                </div>
            </header>
            <div className="flex-1 grid grid-cols-[1fr_300px]">
                <div className="relative bg-gray-900 flex items-center justify-center">
                    <video
                        className="w-full h-full object-cover"
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        autoPlay
                        loop
                        muted
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-gray-900/50 rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>U1</AvatarFallback>
                            </Avatar>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>U2</AvatarFallback>
                            </Avatar>
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>U3</AvatarFallback>
                            </Avatar>
                            <div className="text-sm text-gray-300">+2 more</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                <MicIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                <VideoIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400">
                                <PhoneIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-950 text-gray-300 flex flex-col">
                    <div className="border-b border-gray-800 p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium">Participants</div>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="grid gap-4 p-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">John Doe</div>
                                    <div className="text-sm text-gray-400">Host</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <MicIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <VideoIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">Jane Smith</div>
                                    <div className="text-sm text-gray-400">Participant</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <MicIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <VideoIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>U3</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">Bob Johnson</div>
                                    <div className="text-sm text-gray-400">Participant</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <MicIcon className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300">
                                        <VideoIcon className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



