import React, {useState, useEffect} from 'react';
import VideoMainInfo from "./VideoMainInfo";
import VideoDetails from "./VideoDetails";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import TuneIcon from '@material-ui/icons/Tune';
import {DateTime} from 'luxon';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useParams} from 'react-router';

const SearchResults = (props) => {
    let { searchQuery } = useParams();

    const [videoMainInfo, setVideoMainInfo] = useState("");
    const [videoDetails, setVideoDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setVideoMainInfo('');
        setVideoDetails([]);
        axios
          .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${searchQuery}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
            createVideoMainInfo(response.data['items'][0]);
            console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
          })

          axios
          .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${searchQuery}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          .then(response => {
            createVideoMainInfo(response.data['items']);
            setIsError(false);
          })
          .catch(error => {
            console.log(error);
            setIsError(true);
            setIsLoading(false);
          })
  
      }, [searchQuery])

      async function createVideoMainInfo(channel) {
        const channelId = channel.id.channelId;
        const response = await axios
            .get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const noOfVideos = response.data.items[0].statistics.videoCount;
        const subs = response.data.items[0].statistics.subscriberCount;
        const snippet = channel.snippet;
        const title = snippet.title;
        const description = snippet.description;
        const image = snippet.thumbnails.medium.url;
        setVideoMainInfo({
          channelId,
          image,
          title,
          subs,
          noOfVideos,
          description
        });
      }

      async function createVideoDetails(videos) {
        let newVideoDetails = [];
        for (const video of videos) {
          const videoId = video.id.videoId;
          const response = await axios
                .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
          const views = response.data.items[0].statistics.viewCount;
          const snippet = video.snippet;
          const title = snippet.title;
          const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
          const channel = snippet.channelTitle;
          const description = snippet.description;
          const image = snippet.thumbnails.medium.url;
  
          newVideoDetails.push({
            videoId,
            title,
            image,
            views,
            timestamp,
            channel, 
            description
          });
        };
        setVideoDetails(newVideoDetails);
        setIsLoading(false);
    }
    if (isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
      }
      return (
          <div>
              <div >
                  <TuneIcon />
                  <h2>Filter</h2>
              </div>
              { isLoading ? <CircularProgress className='loading' color='secondary' /> : null }
              <hr />
              { !isLoading ? <VideoMainInfo 
                                    key={videoMainInfo.channelId}
                                    image={videoMainInfo.image}
                                    channel={videoMainInfo.title}
                                    subs={videoMainInfo.subs}
                                    noOfVideos={videoMainInfo.noOfVideos}
                                    description={videoMainInfo.description}
                              /> : null
              }
              <hr />
              {
                  videoDetails.map(item => {
                    return (
                            <Link key={item.videoId} to={`/video/${item.videoId}`}>
                              <VideoDetails
                                title={item.title}
                                image={item.image}
                                views={item.views}
                                timestamp={item.timestamp}
                                channel={item.channel}
                                description={item.description}
                              />
                            </Link>
                    )
                  })
    
                }   
    
            </div>
      )
}

export default SearchResults;