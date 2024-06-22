import React, { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface SocketContextType {
    socket: WebSocket | null;
    roomId: string | null;
    joinRoom: (roomId: string) => void;
    createRoom: () => void;
    sendMessage: (msg: string) => void;
    fetchUsers: (roomId: string) => void;
    roomUsers: any[];
}

export const socketContext = createContext<SocketContextType>({
    socket: null,
    roomId: null,
    joinRoom: () => {},
    createRoom: () => {},
    sendMessage: () => {},
    fetchUsers: () => {},
    roomUsers: [],
});


export const WebsocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [roomUsers, setRoomUsers] = useState<any[]>([]);
    const [pc, setPc] = useState<RTCPeerConnection | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        socketRef.current = new WebSocket('https://video-chat-backend-latest.onrender.com/');

        socketRef.current.onopen = (event: Event) => {
            if (roomId) { fetchUsers(roomId) }
            console.log('WebSocket connection opened:', event);
        };

        socketRef.current.onclose = (event: CloseEvent) => {
            console.log('WebSocket connection closed:', event);
        };

        socketRef.current.onerror = (event: Event) => {
            console.error('WebSocket error:', event);
        };

        socketRef.current.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message.type === 'join-response' && message.roomId) {
                setRoomId(message.roomId);
                fetchUsers(message.roomId);
            } else if (message.type === 'create-response' && message.roomId) {
                setRoomId(message.roomId);
                fetchUsers(message.roomId);
            } else if (message.type === 'user-joined') {
                fetchUsers(message.roomId)
            }
            else if (message.type === 'id-info') {
                setUserId(message.userId);
            } else if (message.type === 'createOffer') {
                handleOfferMessage(message);
            } else if (message.type === 'createAnswer') {
                handleAnswerMessage(message);
            } else if (message.type === 'iceCandidate') {
                handleIceCandidateMessage(message);
            } else if (message.type === 'roomUsers-response') {
                console.log(message.users);
                setRoomUsers(message.users);
            }
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (roomId) {
            navigate(`/meet/${roomId}`);
        }
    }, [roomId, navigate]);


    const createRoom = () => {
        socketRef.current?.send(JSON.stringify({
            type: 'create',
            userId,
        }));
        const pc = new RTCPeerConnection();
        setPc(pc);
        setupMediaDevices(pc);
        setupConnectionListeners(pc);
    };

    const joinRoom = (roomId: string) => {
        console.log('Joining room...')
        socketRef.current?.send(JSON.stringify({
            type: 'join',
            userId,
            roomId: roomId,
        }));
    };

    const sendMessage = (msg: string) => {
        console.log('sending msg...');
        socketRef.current?.send(JSON.stringify({
            type: 'message',
            userId,
            message: msg
        }));
    };

    const fetchUsers = (roomId: string) => {
        console.log('fetching users...');
        socketRef.current?.send(JSON.stringify({
            type: "fetchUsers",
            roomId,
        }));
    };

    const handleOfferMessage = async (message: any) => {
        if (!pc) return;
        await pc.setRemoteDescription(message.sdp);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketRef.current?.send(JSON.stringify({
            type: 'createAnswer',
            sdp: pc.localDescription
        }));
    };

    const handleAnswerMessage = async (message: any) => {
        if (!pc) return;
        await pc.setRemoteDescription(message.sdp);
    };

    const handleIceCandidateMessage = async (message: any) => {
        if (!pc) return;
        try {
            await pc.addIceCandidate(message.candidate);
        } catch (e) {
            console.error('Error adding ICE candidate:', e);
        }
    };

    const setupMediaDevices = (pc: RTCPeerConnection) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                stream.getTracks().forEach(track => pc.addTrack(track, stream));
            })
            .catch(error => {
                console.error('Error accessing media devices:', error);
            });
    };

    const setupConnectionListeners = (pc: RTCPeerConnection) => {
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current?.send(JSON.stringify({
                    type: "iceCandidate",
                    candidate: event.candidate
                }));
            }
        };

        pc.ontrack = (event) => {
            console.log('Received remote track:', event.streams[0]);
        };
    };

    return (
        <socketContext.Provider value={{ socket: socketRef.current, joinRoom, createRoom, sendMessage, roomId, fetchUsers, roomUsers }}>
            {children}
        </socketContext.Provider>
    );
};
