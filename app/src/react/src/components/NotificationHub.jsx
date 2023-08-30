import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext';

export default function NotificationHub({ socket }) {
    const { user } = useAuth();

    const handleClick = () => {
        socket.emit('auth', { message: user.email });
    }

    return (
        <div className='flex justify-center items-center h-full flex-col gap-4 p-8'>
            <h1 className='text-2xl'>Registro de cambios</h1>
            <p className='text-sm'>Si hubo cambios en Google Drive, se notificara aqui. Presione el siguiente boton para conocer que cambios hubo en Google Drive desde su ultima consulta</p>
            <button disabled={!user} onClick={() => handleClick()} className='p-4 cursor-pointer ml-3 inline-block rounded-lg bg-blue-500 py-2 text-sm font-medium text-white'>¿Que cambios hubo en Google Drive?</button>
        </div>
    )
}
