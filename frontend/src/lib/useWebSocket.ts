let socket:WebSocket|null=null;
export const useWebSocket=()=>{
    if(!socket){
        socket=new WebSocket('ws://localhost:8000')
    }
    return socket;
}