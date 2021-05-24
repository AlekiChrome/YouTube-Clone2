
import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import SideBarRow from '../SideBarRow/SideBarRow';
import ReplyIcon from '@material-ui/icons/Reply';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import './VideoSourceInfo.css';
import { Avatar, Button } from '@material-ui/core';

const VideoSourceInfo = ({title, description, publishedDate, channelTitle, channelImage, viewCount, likeCount, dislikeCount, subs}) => {
    return (
            <div className='video-deets'>
            <div className='v-header'>
                <h1>{title}</h1>
            </div>
            <div className='video-deets'>
                <p>{viewCount} views • {publishedDate}</p>
                <div className="likes">
                    <SideBarRow Icon={ThumbUpIcon} title={likeCount} />
                    <SideBarRow Icon={ThumbDownIcon} title={dislikeCount} />
                    <SideBarRow Icon={ReplyIcon} title='SHARE' />
                    <SideBarRow Icon={PlaylistAddIcon} title='SAVE' />
                    <SideBarRow Icon={MoreHorizIcon} title='' />
                </div>
            </div>
            <hr />
            <div className="channel-info">
                <div>
                    <Avatar 
                        className='v-avatar' 
                        alt={channelTitle} 
                        src={channelImage} 
                    />
                    <div className='v-channel-info'>
                        <h3 className='v-info-title'>{channelTitle}</h3>
                        <p className='subs'>{subs} subscribers</p>
                    </div>
                    
                </div>
                <div className='subscribe'>
                    <Button color='secondary' >SUBSCRIBE</Button>
                </div>
            </div>
            <div className='video-description'>
                <p>{description}</p>
            </div>
        </div>
        
    )
}

export default VideoSourceInfo;