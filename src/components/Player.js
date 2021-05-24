import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import Video from './Video';
import './Player.css';
import VideoMainInfo from './VideoMainInfo';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const Player = () => {
    let { videoId } = useParams();

    const [videoMainInfo, setMainVideoInfo] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        VideoMainInfo([]);
        setIsLoading(true);
        axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
              createMainVideoInfo(response.data['items'][0]);
              setIsError(false);
          })
          .catch(error => {
              console.log(error);
              setIsError(true);
          })
    }, [videoMainInfo, videoId])

    async function createMainVideoInfo(video) {
        const snippet = video.snippet;
        const stats = video.statistics;
        const channelId = snippet.channelId;
        const response = await axios
                              .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)

        const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const subs = response.data.items[0].statistics.subscriberCount;
        const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-us', {  
                            day : 'numeric',
                            month : 'short',
                            year : 'numeric'
        });

        const title = snippet.title;
        const description = snippet.description;
        const channelTitle = snippet.channelTitle;
        const viewCount = stats.viewCount;
        const likeCount = stats.likeCount;
        const dislikeCount = stats.dislikeCount;

        setMainVideoInfo({
            title,
            description,
            publishedDate,
            channelTitle,
            channelImage,
            viewCount,
            likeCount,
            dislikeCount,
            subs
        });
        setIsLoading(false);
    }
    if(isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className='videoplayer'>
            <div className='videoplayer-details'>
                <div className='video-render'>
                    {isLoading ? <CircularProgress className='loading' color='secondary'/> : <Video videoId={videoId} /> }
                </div>
                <div className='videoplayer-info'>
                    {!isLoading ? <VideoMainInfo
                                    title={videoMainInfo.snippet}
                                    description={videoMainInfo.description}
                                    publishedDate={videoMainInfo.publishedDate}
                                    channelTitle={videoMainInfo.channelTitle}
                                    channelImage={videoMainInfo.channelImage}
                                    viewCount={videoMainInfo.viewCount}
                                    likeCount={videoMainInfo.likeCount}
                                    dislikeCount={videoMainInfo.dislikeCount}
                                    subs={VideoMainInfo.subs}
                                  /> : null
                    }
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Player;