import React from 'react';
import '../styles/Chatbot.css';

const Message = ({ contentType, content, imageResponseCard, isUser, handleSubmit }) => {
  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      {
        contentType === 'PlainText' ? (
          <div>{content}</div>
        ) : (
          <>
            {imageResponseCard?.title && <p><strong>{imageResponseCard.title}</strong></p>}
            {imageResponseCard?.subtitle && <p>{imageResponseCard.subtitle}</p>}
            {imageResponseCard?.imageUrl && (
              <div>
                <img 
                  src={imageResponseCard.imageUrl} 
                  alt={imageResponseCard.title} 
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
              </div>
            )}
            {imageResponseCard?.buttons && imageResponseCard?.buttons?.map((val, index) => (
              <button 
                key={index} 
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, {
                    content: val.text, 
                    isUser: true,
                    contentType: "PlainText"
                  });
                }}
              >
                {val.text}
              </button>
            ))}
          </>
        )
      }
    </div>
  );
};

export default Message;
