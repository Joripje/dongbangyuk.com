import  {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { TextField, Box, Button } from '@mui/material'

// firestore
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db, auth } from 'service/firebase';


function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);


  const bottomRef = useRef<any>();

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const queryMessages = query(messagesRef, orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages : any = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id })
      });
      setMessages(messages);

    });
    return () => unsubscribe();
  },[]);

  // 최신댓글을 항상 보여줌
  useEffect(() => {
    if (bottomRef.current) {
      console.log(bottomRef)
      bottomRef.current.scrollIntoView({ behavior: "smooth"});
    }
  }, [bottomRef]);

  // console.log(messages[9].uid)
  // 메시지 세팅하는거
  const handleChange = (e: any) => {
    setNewMessage(e.target.value);
  }

  // 메시지 제출하는거 파베에 제출
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newMessage === '')
    return;
    const messagesRef = collection(db, 'messages');
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: auth.currentUser !== null? auth?.currentUser?.uid : -1,
    });
    setNewMessage('');
    
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    
    <WrapBox>
      <h1>채팅방</h1>
      <div ref={bottomRef}>
        {messages.reverse().map((message: any) => (
          message.uid === auth?.currentUser?.uid? 
          <MessageBox key={message.id}>
            <Message>
              나 : {message.text}
            </Message>
            {message.createdAt?.toDate().toLocaleString()}
          </MessageBox> : 
          <MessageBox key={message.id}>
            <Message>
              누군가: {message.text}
            </Message>
            {message.createdAt?.toDate().toLocaleString()}
          </MessageBox>
        ))}
      </div>
        <div ></div>
        <form style={{display: 'flex', justifyContent: 'space-between'}} onSubmit={handleSubmit}>
          <MessageInput value={newMessage} onChange={handleChange} placeholder='메시지를 입력하세요'/>
          <SendButton  variant='outlined' type='submit'>보내기</SendButton>    
        </form>
    </WrapBox>
  )
}

const Message = styled.div({
  left: '10rem',
  display: 'flex',
  fontSize: '3rem'
})

const MessageBox = styled.div ({
  height: '10vh',
  backgroundColor: '#D9D9D9',
  margin: '1rem',
  borderRadius: '2rem',
  width: '60%',
  overflow: 'auto'
})

const WrapBox = styled(Box)({
  backgroundColor: '#DEF5E5',
  borderRadius: '1rem',
  marginLeft: '15vw',
  marginTop: "20vh",
  width: "65vw",
  height: '60vh',
  overflowY: 'scroll',
  padding: '2rem'
  
});

const MessageInput = styled(TextField) ({
  // marginTop: '30vh',
  // position: 'fixed',
  bottom: '15%',
  width: '50vw',
  left: '1rem',
  // height: '10%',
  // backgroundColor: '#575757',
  borderRadius: '1rem'
})

const SendButton = styled(Button) ({
  // position: 'fixed',
  top: '78%',
  left: '1rem',
  width: '10vw',
  height: '4vh'
})


export default Chat
