import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { io } from "socket.io-client";
import { getCookie } from '../helpers/cookie';
import config from '../configuration';

const ChatContext = React.createContext();

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {

    const socket = null;

    const [chat, setChat] = useState([]);
    const [lastMessageList, setLastMessageList] = useState([]);

    const createMessage = (message) => {
        setChat(prevState => {
            return {
                ...prevState,
                message
            }
        })
    };

    useEffect(() => {

        const currentUserId = Number(getCookie("teammers-id"))

        // // last 5 conversation
        let last_conversations = chat.slice(Math.max(chat.length - 5, 0));

        console.log('CONVERSATION LSIT [ 0 ]', last_conversations[0]);

        let arr = last_conversations.map(item => {

            let members = [];
            let member_names = '';
            let lastMessage = item.messages[item.messages.length - 1];

            members = item.members.filter(x => x.id !== currentUserId)
            member_names += members.map(item => item.full_name + ' ');

            return {
                id: item.id,
                created_at: item.created_at,
                title: member_names,
                avatar: members[0]?.detail?.photo,
                lastMessage: {
                    isOwn: lastMessage.from === currentUserId,
                    content: lastMessage?.body,
                }
            }
        });

        setLastMessageList(arr)
    }, [chat]);

    const connectSocket = () => {
        socket = io("wss://beta.teammers.com/chat", {
            auth: {
                token: getCookie("teammers-access-token")
            }
        });

        socket.on('success', response => {
            console.log('socket connection', response);
        });

        socket.on('message', message => {
            console.log('socket message', message);
            setChat(prevState => {
                console.log('on message set obj', [...prevState, message]);

                let conversation = prevState.find(x => x.id === message.conversation_id);

                if (conversation) {
                    conversation.messages.push(message);
                };

                return [
                    ...prevState,
                    conversation
                ]
            })
        });
    };

    // // mount
    useEffect(() => {
        if (getCookie("teammers-access-token")) {
            axios.get(config.BASE_URL + 'conversations?include=messages,members,unreadMessages').then(res => {
                if (res.data.success) {
                    setChat(res.data.data.items);
                }
            });

            connectSocket();
        };
    }, [getCookie("teammers-access-token")]);

    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
                createMessage,
                lastMessageList
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider