import React, { useState,useEffect,useRef } from "react";
import lexRuntimeV2 from "../aws-config";
import Message from "./Message";
import "../styles/Chatbot.css";
import moment from "moment";
import DatePickerComponent from "./DatePickerComponent";
import TimePickerComponent from "./TimePickerComponent";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const messageListRef = useRef(null);
  const lexInputObject = {
    botId: process.env.REACT_APP_BOT_ID,
    botAliasId: process.env.REACT_APP_BOT_ALIAS_ID,
    localeId: process.env.REACT_APP_LOCALE_ID,
    sessionId: `${moment()
      .format("YYYY-MM-DD")
      .replace(/[^\w\s]/gi, "")}`,
  };

  const handleSubmit = async (e, messageObject) => {
    e?.preventDefault();
    const newMessage = messageObject || {
      content: input,
      isUser: true,
      contentType: "PlainText",
    };

    setMessages([...messages, newMessage]);
    try {
      const lexInput = {
        ...lexInputObject,
        text: newMessage.content,
      };
      const response = await lexRuntimeV2.recognizeText(lexInput).promise();
      const botMessagesArray = response.messages.map((msg) => {
        msg.isUser = false;
        return msg;
      });
      if (botMessagesArray.some(msg => msg.content === 'When would you like to schedule the appointment?')) {
        setShowDatePicker(true)
      } else if(botMessagesArray.some(msg => msg.content === 'At what time would you like the appointment?')) {
        setShowTimePicker(true)
      }
      setMessages((prevMessages) => [...prevMessages, ...botMessagesArray]);
    } catch (error) {
      console.error("Error sending message to Lex:", error);
    }

    setInput("");
  };
  const handleDateSelected = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const dateMessage = {
      content: formattedDate,
      isUser: true,
      contentType: "PlainText",
    }
    handleSubmit(null, dateMessage)
    setShowDatePicker(false)
  }
  const handleTimeSelected = (formattedTime) => {
    const timeMessage = {
      content: formattedTime,
      isUser: true,
      contentType: "PlainText"
    }
    handleSubmit(null, timeMessage)
    setShowTimePicker(false)
  }
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <>
      <div className="bot-div">
        <div ref={messageListRef}>
          {messages.map((msg, index) => (
            <Message
              key={index}
              contentType={msg?.contentType}
              content={msg?.content}
              imageResponseCard={msg?.imageResponseCard}
              isUser={msg?.isUser}
              handleSubmit={handleSubmit}
            />
          ))}
        </div>
        <div className="bot-form-input">
          <form onSubmit={(e) => handleSubmit(e, null)}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
        {showDatePicker && <DatePickerComponent handleDateSelected={handleDateSelected}/>}
        {showTimePicker && <TimePickerComponent handleTimeSelected={handleTimeSelected}/>}
      </div>
    </>
  );
};

export default Chatbot;
