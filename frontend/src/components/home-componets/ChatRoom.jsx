import { X } from "lucide-react";
import React, { useState } from "react";
import socket from "../../sockets/socket";
import { useEffect } from "react";
import { useUser } from '@clerk/react'
import { useRef } from "react";
import "../../css/Chatroom.css"
import axios from "axios";
import { useAuth } from "@clerk/react";
import { toast, ToastContainer } from "react-toastify";
import TermsAndConditionsModal from "../Chat-Room-components/terms-and-conditions";
import { BsExclamationCircle } from "react-icons/bs";



function ChatRoom({ roomId, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [reporting, setReporting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [reportMsg, setReportMsg] = useState(null);
  const [isBanned, setIsBanned] = useState(false);

  const bottomRef = useRef(null);

  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const handleSystemError = (data) => {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
      });

      if (data.message.includes("restricted") || data.message.includes("suspended")) {
        setIsBanned(true);
      }
    };

    socket.on("system-error", handleSystemError);

    return () => {
      socket.off("system-error", handleSystemError);
    };
  }, []);

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
  }, [roomId]);

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
          `${import.meta.env.VITE_CHAT_SERVER_URL}/api/messages/${roomId}`
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


  const handleReport = async () => {
    // console.log(msg);
    console.log("Report clicked");

    if (!reportMsg || reporting) return;

    setReporting(true);


    try {
      const token = await getToken();
      console.log(token);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/report`,
        {
          reportedUserId: reportMsg.senderId,
          messageContent: reportMsg.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      toast.success("Report Submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error("Failed to submit report.");

    } finally {
      setReporting(false);
      setReportMsg(null);
    }
  };

  return (
    <>
      <ToastContainer />
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
                  className={`message-row ${isMine
                    ? "mine"
                    : "other"
                    }`}
                >

                  <div
                    className={`message-bubble ${isMine
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

                    <div className="message-footer">

                      <span className="message-time">
                        {msg.createdAt &&
                          new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </span>

                      {!isMine && (
                        <button
                          className="report-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReportMsg(msg);
                          }}
                        >
                          Report
                        </button>
                      )}

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
              placeholder={isBanned ? "Your chat privileges have been suspended." : "Type a message..."}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              disabled={isBanned}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isBanned) {
                  handleSend();
                }
              }}
            />

            {/* Report Confirmation Modal */}
            {reportMsg && (
              <div className="fixed! inset-0! z-[9999]! flex! items-center! justify-center! bg-slate-900/40! backdrop-blur-sm! p-4! transition-opacity!">
                <div className="bg-white! rounded-xl! shadow-2xl! w-full! max-w-sm! overflow-hidden! animate-in! fade-in! zoom-in-95! duration-200!">

                  <div className="p-6!">
                    <h3 className="text-lg! font-bold! text-slate-800! mb-3!">
                      Confirm Report
                    </h3>
                    <p className="text-slate-600! text-sm! leading-relaxed!">
                      Are you sure to report this user?
                      <span className="block! mt-3! text-xs! text-slate-500! italic!">
                        (Read terms and conditions section to comply with the regulations)
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-slate-50! px-6! py-4! flex! justify-end! gap-3! border-t! border-slate-100!">
                    <button
                      onClick={() => setReportMsg(null)}
                      disabled={reporting}
                      className="px-4! py-2! text-sm! font-medium! text-slate-700! bg-white! border! border-slate-300! rounded-lg! hover:bg-slate-50! transition-colors! focus:outline-none! disabled:opacity-50!"
                    >
                      No
                    </button>
                    <button
                      onClick={handleReport}
                      disabled={reporting}
                      className="flex! items-center! justify-center! px-4! py-2! text-sm! font-medium! text-white! bg-red-600! rounded-lg! hover:bg-red-700! transition-colors! focus:outline-none! disabled:opacity-50! min-w-[80px]!"
                    >
                      {reporting ? (
                        <>
                          <svg className="animate-spin! -ml-1! mr-2! h-4! w-4! text-white!" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25!" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75!" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Wait...
                        </>
                      ) : (
                        "Ok"
                      )}
                    </button>
                  </div>

                </div>
              </div>
            )}

            <button
              className={`px-4! py-2! font-medium! rounded-lg! transition-colors! focus:outline-none! disabled:cursor-not-allowed! ${isBanned
                ? "bg-slate-200! text-slate-500! border! border-slate-300!"
                : "bg-blue-600! text-white! hover:bg-blue-700! shadow-sm!"
                }`}
              onClick={handleSend}
              disabled={isBanned}
            >
              Send
            </button>

          </div>

          <div className="w-full! bg-slate-50! py-2! border-t! border-slate-200! rounded-b-lg! flex! justify-center! items-center! mt-auto!">
            <button
              onClick={() => setShowTerms(true)}
              className="group! flex! items-center! gap-1.5! text-[11px]! sm:text-xs! font-medium! text-slate-500! hover:text-slate-700! transition-colors! focus:outline-none! bg-transparent! border-none! p-1!"
            >
              <BsExclamationCircle className="w-3.5! h-3.5! text-slate-400! group-hover:text-blue-500! transition-colors!" />
              <span className="group-hover:underline! decoration-blue-200! underline-offset-2!">
                Review Chat Room Terms & Conditions
              </span>
            </button>

            {showTerms && <TermsAndConditionsModal onClose={() => setShowTerms(false)} />}
          </div>

        </div>

      </div>
    </>
  );
}

export default ChatRoom;