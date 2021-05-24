import React from "react";
import './VideoMainInfo.css';
import Avatar from '@material-ui/core/Avatar';

const VideoMainInfo = ({image, channel, subs, noOfVideos, description}) => {
    return (
        <div className='video-main-info'>
            <Avatar 
              className='video-main-info-avatar'
              alt={channel}
              src={image}
            />
            <div className="video-main-text">
              <h4>{channel}</h4>
              <p>{subs} subscribers • {noOfVideos} videos</p>
              <p>{description}</p>
            </div>
        </div>
    )
}

export default VideoMainInfo;