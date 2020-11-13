import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
            setRooms(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
        ));

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        setFilteredRooms(
            rooms.filter(room => {
                return room.data.name.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, rooms])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input
                        name="inupt"
                        placeholder="Search room"
                        type="text"
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {filteredRooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
