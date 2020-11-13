import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase'
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [{ user }, dispatch] = useStateValue();
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));
            db
                .collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map(doc => doc.data())));
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log('You typed >>>', input);
        db.collection("rooms")
            .doc(roomId)
            .collection("messages").add({
                name: user.displayName,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message, i) => (
                    <p key={i} className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form action="">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
