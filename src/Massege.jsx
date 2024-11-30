import React, { useState, useEffect } from 'react';
import './massege.css';

const messages = [
  { name: "מיכל, תורמת", message: "אני גאה להיות חלק מקמפיין התרומות של יד שרה. כל תרומה עושה שינוי אמיתי! 🙌" },
  { name: "דני, מקבל סיוע", message: "בזכותכם אני יכול להחלים בבית ולקבל טיפול רפואי מציל חיים. תודה רבה! 💙" },
  { name: "שרה, תורמת", message: "כחלק מקהילה עוזרת, אני מאמינה שכל תרומה – קטנה או גדולה – עושה שינוי בחיים של אנשים! 🌟" },
  { name: "רון, מקבל סיוע", message: "תרומתכם עזרה לי לצאת מהמצב הקשה בו הייתי. עכשיו אני יכול לעמוד על רגליי! 🙏" },
  { name: "דניאל, תורם", message: "אני שמח לקחת חלק בקמפיין שמביא כל כך הרבה אושר לאנשים אחרים. כל תרומה עושה את ההבדל! 🎉" }
];

const WhatsappMessages = () => {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-bubble ${index % 2 === 0 ? 'sent' : 'received'}`}
          style={{ animationDelay: `${index * 0.5}s` }} // זמן עיכוב עבור כל הודעה
        >
          <p className="message-text">"{message.message}"</p>
          <p className="message-name">- {message.name}</p>
        </div>
      ))}
    </div>
  );
};

export default WhatsappMessages;




