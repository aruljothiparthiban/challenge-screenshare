import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import MoreVerticalIcon from './MoreVerticalIcon';

const ICON_MARGIN = {
	TOP: 4,
	RIGHT: 4
};

const Stream = ({ containerHeight, containerWidth, mediaStream }) => {
	const videoRef = useRef();
	let iconElement;

	const updateIconStyle = ({ top, right }) => {
		if (iconElement) {
			iconElement.style.position = 'absolute';
			iconElement.style.top = `${top + ICON_MARGIN.TOP}px`;
			iconElement.style.right = `${right + ICON_MARGIN.RIGHT}px`;
			iconElement.style.backgroundColor = '#333';
			iconElement.style.borderRadius = '2px';
		}
	};

	const onResize = e => {
		const { videoWidth, videoHeight } = e.target;
		const scale = Math.min(
			containerWidth / videoWidth,
			containerHeight / videoHeight
		);
		updateIconStyle({
			top: Math.round((containerHeight - Math.round(scale * videoHeight)) / 2),
			right: Math.round((containerWidth - Math.round(scale * videoWidth)) / 2)
		});
	};

	useEffect(() => {
		videoRef.current.srcObject = mediaStream;
		iconElement = videoRef.current.nextElementSibling;
		videoRef.current.addEventListener('resize', onResize);
		return () => {
			videoRef.current.removeEventListener('resize', onResize);
		}
	}, [mediaStream]);

	return (
		<div
			style={{
				width: `${containerWidth}px`,
				height: `${containerHeight}px`,
				position: 'relative',
				backgroundColor: 'black',
			}}
		>
			<video
				autoPlay
				muted
				ref={videoRef}
				style={{ width: '100%', height: '100%' }}
			/>
			<MoreVerticalIcon fill="#fff" />
		</div>
	);
};

Stream.propTypes = {
	containerHeight: PropTypes.number.isRequired,
	containerWidth: PropTypes.number.isRequired,
	mediaStream: PropTypes.object.isRequired,
};

export default Stream;
