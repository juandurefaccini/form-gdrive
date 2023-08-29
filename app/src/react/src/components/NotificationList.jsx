import React, { useEffect, useState } from 'react'
import { socket } from '../socket';
import { useAuth } from '../context/authContext';
import { useSnackbar } from 'notistack';

export default function NotificationList() {
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    function connect() {
        socket.io.opts.query = { userid: user.email };
        socket.connect()
    }

    function disconnect() {
        socket.disconnect();
    }

    useEffect(() => {

        connect();

        console.log("useEffect");

        socket.on('default', (res) => {
            console.log({ res });
            if (res) {
                if (res.length) {
                    const messages = res.split(",");
                    messages.forEach(element => {
                        enqueueSnackbar(element, { variant: "info" });
                    });
                }
                enqueueSnackbar(res, { variant: "info" });
            }
        })

        return () => {
            disconnect();
        };
    }, []);

    return (
        <div className="App">
        </div>
    );
}
