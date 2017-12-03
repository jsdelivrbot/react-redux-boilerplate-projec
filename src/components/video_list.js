import React from 'react';
import VideoListItem from './video_list_item'

const VideoList = (props) => {
	const videos = props.videos;
	console.log(videos);
	const videoItems = videos.map( video => {
		return (
			<VideoListItem
			onVideoSelect = { props.onVideoSelect }
			key={video.etag}
			video={video} />
		);
	});
	console.log(props.videos.length);
	return(<ul className="col-md-4 list-group">
		{videoItems}
	</ul>);
};

export default VideoList;
