import React, { useState, useRef } from 'react';
import styles from './AudioPlayer.module.css';

const AudioPlayer = ({src}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);
    const rangeRef = useRef(null);

    const togglePause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const updateProgress = () => {
        const progress = audioRef.current.currentTime / audioRef.current.duration;
        setProgress(progress);
        const rangeShadowLength = rangeRef.current.clientWidth * progress
        rangeRef.current.style.setProperty('--shadow', `inset ${rangeShadowLength}px 0 #0435FD`);
    }

    const seek = (e) => {
        audioRef.current.currentTime = e.target.value * audioRef.current.duration;
    }

    return <>
        <audio src={src} ref={audioRef} onTimeUpdate={updateProgress}></audio>
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={() => togglePause()}>
                <img className={styles.icon} src={isPlaying ? '/images/pause.svg' : '/images/play.svg'}></img>
            </button>
            <input type="range" ref={rangeRef} className={styles.range} value={progress} onChange={seek} min="0" max="1" step="0.001"></input>
        </div>
    </>;
}

export default AudioPlayer;