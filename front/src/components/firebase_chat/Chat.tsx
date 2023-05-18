import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// firestore
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "service/firebase";
import { borderBottom } from "@mui/system";

function Chat() {
  const bottomRef = useRef<any>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const queryMessages = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      // console.log(messages.length);
    });
    return () => unsubscribe();
  }, []);

  // 최신댓글을 항상 보여줌
  useEffect(() => {
    if (bottomRef.current) {
      // console.log(bottomRef);
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef, messages]);

  // 메시지 세팅하는거
  const handleChange = (e: any) => {
    setNewMessage(e.target.value);
    // console.log(newMessage);
  };

  // 메시지 제출하는거 파베에 제출
  const handleSubmit = async (e: any) => {
    console.log("hi");
    e.preventDefault();
    if (newMessage === "") return;
    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: auth.currentUser !== null ? auth?.currentUser?.uid : -1,
    });
    setNewMessage("");

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <WrapBox>
      <ChatTypo>채팅 채팅</ChatTypo>
      <ChatBox>
        {[...messages].reverse().map((message: any) =>
          message.uid === auth?.currentUser?.uid ? (
            <Right key={message.id}>
              <MessageBox2>
                <Message>나 : {message.text}</Message>
                <Date>{message.createdAt?.toDate().toLocaleString()}</Date>
              </MessageBox2>
            </Right>
          ) : (
            <Left key={message.id}>
              <MessageBox>
                <Message>누군가: {message.text}</Message>
                <Date>{message.createdAt?.toDate().toLocaleString()}</Date>
              </MessageBox>
            </Left>
          )
        )}
        <div ref={bottomRef} />
      </ChatBox>
        <FormBox
          onSubmit={handleSubmit}
        >
          <MessageInput
            value={newMessage}
            onChange={handleChange}
            placeholder="메시지를 입력하세요"
          />
          {/* <SendButton type="submit">보내기</SendButton> */}
        </FormBox>
    </WrapBox>
  );
}

const WrapBox = styled.div({
  backgroundColor: "#DEF5E5",
  borderRadius: "1rem",
  marginLeft: "6vw",
  width: "50vw",
  height: "65vh",
});

const ChatTypo = styled.div({
  padding: '2%',
  fontSize: '2rem',
  // borderBottom: 'solid'
})

const Right = styled.div({
  display: "flex",
  flexDirection: "row-reverse",
});

const Left = styled.div({
  display: "flex",
  flexDirection: "row",
});

// const ChatBox = styled.div({
//   width: "100%",
//   height: "80%",
//   padding: "2rem, 0",
//   overflowY: "scroll",
// });

const ChatBox = styled.div`
  position: relative;
  height: 75%;
  overflow-y: scroll;
  margin: 0 2rem;

  /* Customize the scrollbar */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the vertical scrollbar */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar thumb on hover */
  }
`;

const FormBox = styled.form({
  width: "inherit",
  height: "14%",
  display: "flex", 
  alignItems: 'center',
  // borderTop: 'solid'
});

const Message = styled.li({
  left: "10rem",
  display: "flex",
  fontSize: "1.5rem",
  margin: "1rem",
});
const Date = styled.div({
  // left: "10rem",
  display: "flex",
  fontSize: "1rem",
  alignContent: "center",
  margin: "1rem",
});

const MessageBox = styled.ul({
  height: "10%",
  backgroundColor: "#D9D9D9",
  margin: "1rem",
  borderRadius: "2rem",
  width: "60%",
  overflow: "auto",
  display: "flex",
  justifyContent: "space-between",
});
const MessageBox2 = styled.ul({
  height: "10%",
  backgroundColor: "#D9D9D9",
  margin: "1rem",
  borderRadius: "2rem",
  width: "60%",
  overflow: "auto",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row-reverse",
});



const MessageInput = styled.input({
  width: "90%",
  borderRadius: "1rem",
  height: "3rem",
  backgroundColor: "#575757",
  color: "white",
  fontSize: "2rem",
  bottom: '1.5rem',
  marginLeft: '1rem',
  paddingLeft: "1rem"
});

// const SendButton = styled.button({
//   width: "10%",
//   height: "5rem",
// });

export default Chat;
