import React from 'react';
import './SideBar.css';
import SideLayout from "./SideLayout";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const SideBar = () => {
    return (
        <div className='sidebar'>
            <SideLayout selected Icon={HomeIcon} title='Home' />
            <SideLayout Icon={WhatshotIcon} title='Trending' />
            <SideLayout Icon={SubscriptionsIcon} title='Subscription' />
            <hr />
            <SideLayout Icon={VideoLibraryIcon} title='Library' />
            <SideLayout Icon={HistoryIcon} title='History' />
            <SideLayout Icon={OndemandVideoIcon} title='Your videos' />
            <SideLayout Icon={WatchLaterIcon} title='Watch later' />
            <SideLayout Icon={ThumbUpIcon} title='Liked vides' />
            <hr />
        </div>
    )
}

export default SideBar;