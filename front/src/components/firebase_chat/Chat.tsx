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

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const bottomRef = useRef<any>();
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
      console.log(bottomRef);
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
      <h1>open talk</h1>
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
        style={{ display: "flex", justifyContent: "space-between" }}
        onSubmit={handleSubmit}
      >
        <MessageInput
          value={newMessage}
          onChange={handleChange}
          placeholder="메시지를 입력하세요"
        />
        <SendButton type="submit">보내기</SendButton>
      </FormBox>
    </WrapBox>
  );
}

const Right = styled.div({
  display: "flex",
  flexDirection: "row-reverse",
});

const Left = styled.div({
  display: "flex",
  flexDirection: "row",
});

const ChatBox = styled.div({
  width: "100%",
  height: "75%",
  padding: "2rem, 0",
  overflowY: "scroll",
});

const FormBox = styled.form({
  width: "100%",
  padding: "1rem",
  display: "flex",
  height: "3rem",
  marginLeft: "2rem",
  marginTop: "2rem",
});

const Message = styled.li({
  left: "10rem",
  display: "flex",
  fontSize: "2rem",
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
  // flexDirection: "row-reverse",
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

const WrapBox = styled.div({
  backgroundColor: "#DEF5E5",
  borderRadius: "1rem",
  marginLeft: "15vw",
  marginTop: "20vh",
  width: "65vw",
  height: "60vh",
  // overflowY: "scroll",
  padding: "2rem",
});

const MessageInput = styled.input({
  width: "100%",
  borderRadius: "1rem",
  height: "4rem",
  backgroundColor: "#575757",
  color: "white",
  fontSize: "2rem",
});

const SendButton = styled.button({
  width: "10%",
  height: "5rem",
  visibility: "hidden",
});

export default Chat;
