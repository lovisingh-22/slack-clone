import React , { useRef,useEffect } from 'react'
import styled from "styled-components"

import ChatInput from "./ChatInput"
import Message from "./Message"

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import { selectRoomId } from '../features/appSlice'
import {  useSelector } from "react-redux";
import { useCollection,useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'

function Chat() {
////////////////////////
    const chatref = useRef(null); 
////////////////


        const roomId = useSelector(selectRoomId);
        const [roomDetails]= useDocument(
            roomId && db.collection('rooms').doc(roomId)
        );
        
        const[roomMessages , loading] = useCollection(
            roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy("timeStamp","asc")
        )

        // console.log(roomDetails?.data());
        // console.log(roomMessages);

        useEffect(() => {
            chatref?.current?.scrollIntoView({
                behavior:"smooth"
            });
        }, [roomId, loading])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
               <>
               <Header>
                
               <HeaderLeft>
                   <h4>
                       #{roomDetails?.data().name}
                   </h4>
                   <StarBorderOutlinedIcon />

               </HeaderLeft>

               <HeaderRight>
                   <p>
                       <InfoOutlined /> Details
                   </p>
               </HeaderRight>
           </Header>

           <ChatMessages>
                {/* list of messages */}
                {roomMessages?.docs.map(doc=>{
                    const { message, timestamp , user , userImage  }= doc.data();

                   return (
                       <Message
                       key={doc.id}
                       message={message}
                       timestamp={timestamp}
                       user={user}
                       userImage={userImage}
                       />
                   )
                })}
                <ChatBottom ref={chatref}/>
           </ChatMessages>

           <ChatInput 
           chatRef = {chatref}
           channelName={roomDetails?.data().name}
           channelId={roomId}
           /> 
           </>
            )
    }
            
        </ChatContainer>
    )
}



export default Chat;
const ChatBottom = styled.div`
    padding-bottom:200px;
`;
const ChatMessages = styled.div``;


const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    >h4 {
        display:flex;
        text-transform: lowercase;
        margin-right:10px;
    }
    >h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 10px;
    }
`;
const HeaderRight = styled.div`

    >p{
        display:flex;
        align-items:center;
        font-size: 14px;
    }
    >p >.MuiSvgIcon-root { 
        margin-right:5px !important;
        font-size: 16px;

    }
`;
const Header = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 20px !important;
    border-bottom: 1px solid lightgrey;
    margin-top: 60px;
    
`;


const ChatContainer = styled.div`
    flex:0.7;
    flex-grow: 1;
    overflow-y: scroll;
`;

