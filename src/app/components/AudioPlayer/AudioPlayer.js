import React, { useState, useRef } from 'react';
import styles from './AudioPlayer.module.css';

const AudioPlayer = ({src, title}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(null);
    const rangeRef = useRef(null);

    const togglePause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            setIsStarted(true);
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

    const rangeClassName = `${styles.range} ${isStarted ? '' : styles.hidden}`

    return src
        ? <div className={styles.wrapper}>
            <button variant="secondary" className={styles.button} onClick={() => togglePause()}>
                <img className={styles.icon} src={isPlaying ? '/images/pause.svg' : '/images/play.svg'}></img>
            </button>
            <div className={styles.labelProgressWrapper}>
                <label className={styles.label}>{title}</label>
                <input type="range" ref={rangeRef} className={rangeClassName} value={progress} onChange={seek} min="0" max="1" step="0.001"></input>
            </div>
            <audio src={src} ref={audioRef} onTimeUpdate={updateProgress}></audio>
        </div>
        : <span>{title}</span>;
}

export default AudioPlayer;