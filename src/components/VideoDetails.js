import React from 'react';
import './VideoDetails.css';

const VideoDetails = ({views, description, timestamp, channel, title, image}) => {
    return (
        <div className='video-details'>
          <img src={image} alt="" />
          <div className="video-details-text">
              <h3>{title}</h3>
              <p className='video-details-header'>
                {channel} • {views} views • {timestamp}
              </p>
              <p className='video-description'>
                {description}
              </p>
          </div>
        </div>
    )
}

export default VideoDetails;