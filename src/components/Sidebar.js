import React from 'react'
import styled from "styled-components"

import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth"

import SidebarOptions from './SidebarOptions'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CreateIcon from '@material-ui/icons/Create'

import InsertCommentIcon from '@material-ui/icons/InsertComment'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookMarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AppsIcon from '@material-ui/icons/Apps'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'




function Sidebar() {

    const [user] = useAuthState(auth);
    const [ channels, loading , error ] = useCollection(db.collection("rooms"));

    return (
        <SidebarContainer>
            <SidebarHeader>
              <Sidebarinfo>
                  <h2>SLACK</h2>
                  <h3>
                    <FiberManualRecordIcon />
                    {user.displayName}
                  </h3>
              </Sidebarinfo>
                <CreateIcon />
            </SidebarHeader>

            <SidebarOptions Icon={InsertCommentIcon} title="Threads" />
            <SidebarOptions Icon={InboxIcon} title="Mentions & reactions" />
            <SidebarOptions Icon={DraftsIcon} title="Saved Items" />
            <SidebarOptions Icon={BookMarkBorderIcon} title="Channel browser" />
            <SidebarOptions Icon={PeopleAltIcon} title="People & user groups" />
            <SidebarOptions Icon={AppsIcon} title="Apps" />
            <SidebarOptions Icon={FileCopyIcon} title="File browser" />
            <SidebarOptions Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SidebarOptions Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOptions Icon = {AddIcon} addChanneloption title="Add Channel" />

            {channels ?.docs.map(doc =>(
                <SidebarOptions 
                 key={doc.id}
                 id={doc.id} 
                title={doc.data().name} 
                />
            ) )}

        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    color:white;
    flex:0.3;
    border-top:1px solid #49274b;
    max-width:260px;
    margin-top: 60px;
    

    >hr{
        margin-top:10px;
        margin-bottom: 10px;
        border:1px solid #49274b;
    }

`;
const SidebarHeader = styled.div`
    display:flex;
    border-bottom: 1px solid #49274b;
    padding : 13px;
    /* max-width:260px;
    margin-top : 60px; */

    > .MuiSvgIcon-root{
        padding : 8px;
        color: #49274b;
        font-size:18px;
        background-color: white;
        border-radius:999px;
    }
`;


const Sidebarinfo = styled.div`
    flex:1;

    > h2{
        font-size:15px;
        font-weight:900;
        margin-bottom:5px;
    }
    > h3{
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items: center;

    }
    >h3 > .MuiSvgIcon-root{
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color:green;
    }

`;