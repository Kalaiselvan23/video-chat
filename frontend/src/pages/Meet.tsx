import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SettingsIcon, UserIcon, MicIcon, VideoIcon, PhoneIcon, PlusIcon } from "@/icons/icon";
import { SocketContextType, socketContext } from "@/providers/WebSocketProvider";

export default function VideoChatComponent() {
    const { socket, roomId, sendMessage, fetchUsers,roomUsers} = useContext<SocketContextType>(socketContext);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    

    useEffect(() => {
        const initializeWebRTC = async () => {
            try {
                const pc = new RTCPeerConnection();
                setPc(pc);

                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                pc.ontrack = (event) => {
                    setRemoteStreams(prevStreams => [...prevStreams, event.streams[0]]);
                };

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        sendMessage(JSON.stringify({
                            type: 'iceCandidate',
                            candidate: event.candidate
                        }));
                    }
                };

                pc.onnegotiationneeded = async () => {
                    try {
                        const offer = await pc.createOffer();
                        await pc.setLocalDescription(offer);
                        sendMessage(JSON.stringify({
                            type: 'createOffer',
                            sdp: pc.localDescription
                        }));
                    } catch (e) {
                        console.error('Error creating offer:', e);
                    }
                };
            } catch (error) {
                if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    console.error('No camera or microphone found.');
                } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    console.error('Permission to access camera or microphone denied.');
                } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDismissedError') {
                    console.error('Permission to access camera or microphone dismissed.');
                } else {
                    console.error('Error accessing media devices:', error);
                }
            }
        };

        if (roomId && socket) {
            initializeWebRTC();
        }

        return () => {
            if (pc) {
                pc.close();
            }
            setLocalStream(null);
            setRemoteStreams([]);
        };
    }, [roomId, socket, sendMessage]);

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
                        ref={localVideoRef}
                        className="w-full h-full object-cover"
                        autoPlay
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
                            <ul>
                                {roomUsers.map(user=>{
                                    return <li>{user}</li>
                                })}
                            </ul>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="grid gap-4 p-4">
                            {remoteStreams.map((stream, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <video className="w-10 h-10 rounded-full object-cover" autoPlay playsInline muted={false} srcObject={stream} />
                                    <div>
                                        <div className="font-medium">Participant {index + 1}</div>
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
