import { useEffect, useRef } from 'react';

export default function useVitalsSocket(onData) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:4000');
    socketRef.current = socket;

    socket.onopen = () => console.log('WebSocket connected');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onData(data);
      } catch (e) {
        console.error('Invalid WS data:', event.data);
      }
    };

    socket.onerror = (err) => console.error('WebSocket error:', err);
    socket.onclose = () => console.log('WebSocket disconnected');

    return () => {
      socket.close();
    };
  }, [onData]);

  return socketRef.current;
}
