import { X } from "lucide-react";
import React, { useState } from "react";
import socket from "../../sockets/socket";
import { useEffect } from "react";
import { useUser } from '@clerk/react'
import { useRef } from "react";
import "../../css/Chatroom.css"



function ChatRoom({ roomId, onClose }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);


    const { user } = useUser();

    useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", () => {
            console.log(
                "Socket Connected:",
                socket.id
            );
        });

        return () => {
            socket.off("connect");
        };

    }, []);

  const handleSend = () => {
    if (!message.trim() || !user) return;

    socket.emit("send-message", {
        roomId,
        senderId: user.id,
        senderName: user.fullName,
        message,
    });

    setMessage("");
};
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {

        const handleReceive = (msg) => {

            if (msg.roomId !== roomId) return;

            setMessages(prev => [
                ...prev,
                msg
            ]);
        };

        socket.on("receive-message", handleReceive);

        return () => {
            socket.off(
                "receive-message",
                handleReceive
            );
        };

    }, [roomId]);

    useEffect(() => {
        if (!roomId || !user) return;

        socket.emit("join-room", {
            roomId,
            userName: user.fullName,
        });

        console.log("Joined room:", roomId);

        return () => {
            socket.emit("leave-room", {
                roomId,
                userName: user.fullName,
            });
        };
    },[roomId]);

    useEffect(() => {

        const handleUserJoined = (data) => {
            console.log("USER JOINED EVENT", data);

            if (data.roomId !== roomId) return;

            setMessages(prev => [
                ...prev,
                {
                    type: "system",
                    text: `${data.userName} joined the chat`,
                }
            ]);
        };

        socket.on(
            "user-joined",
            handleUserJoined
        );

        return () => {
            socket.off(
                "user-joined",
                handleUserJoined
            );
        };

    }, [roomId]);

    useEffect(() => {

        const handleUserLeft = (data) => {

            if (data.roomId !== roomId) return;

            setMessages(prev => [
                ...prev,
                {
                    type: "system",
                    text: `${data.userName} left the chat`,
                }
            ]);
        };

        socket.on(
            "user-left",
            handleUserLeft
        );

        return () => {
            socket.off(
                "user-left",
                handleUserLeft
            );
        };

    }, [roomId]);

    useEffect(() => {

        const fetchMessages = async () => {

            try {

                const res = await fetch(
                    `http://localhost:5000/api/messages/${roomId}`
                );

                const data = await res.json();

                setMessages(data.messages || []);

            } catch (err) {

                console.error(err);

            }

        };

        if (roomId) {
            fetchMessages();
        }

    }, [roomId]);


    useEffect(() => {
    return () => {
        socket.disconnect();
    };
}, []);

   return (
  <>
    {/* Backdrop */}
    <div
      className="chat-backdrop"
      onClick={onClose}
    ></div>

    {/* Chat Modal */}
    <div className="chat-modal-wrapper">

      <div className="chat-modal">

        {/* Header */}
        <div className="chat-header">

          <div>
            <h4 className="mb-0 fw-bold">
              Report Chat
            </h4>

            <small>
              Room: {roomId}
            </small>
          </div>

          <button
            className="btn btn-light btn-sm rounded-circle"
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        {/* Messages */}
        <div className="chat-body">

          {messages.map((msg, index) => {

            if (msg.type === "system") {
              return (
                <div
                  key={index}
                  className="system-message"
                >
                  {msg.text}
                </div>
              );
            }

            const isMine =
              msg.senderId === user?.id;

            return (
              <div
                key={index}
                className={`message-row ${
                  isMine
                    ? "mine"
                    : "other"
                }`}
              >

                <div
                  className={`message-bubble ${
                    isMine
                      ? "mine-bubble"
                      : "other-bubble"
                  }`}
                >

                  {!isMine && (
                    <div className="sender-name">
                      {msg.senderName}
                    </div>
                  )}

                  <div className="message-text">
                    {msg.message}
                  </div>

                  <div className="message-time">
                    {msg.createdAt &&
                      new Date(
                        msg.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </div>

                </div>

              </div>
            );
          })}

          <div ref={bottomRef}></div>

        </div>

        {/* Footer */}
        <div className="chat-footer">

          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            className="btn btn-primary px-4"
            onClick={handleSend}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  </>
);
}

export default ChatRoom;