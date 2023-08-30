import io from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = 'http://9dbf-181-105-62-60.ngrok-free.app/'
const URL = 'ws://localhost:8086';

export const getSocket = () => io(URL);
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

// export const socket = io(URL);