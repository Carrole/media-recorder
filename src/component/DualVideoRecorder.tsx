import React, {useState, useEffect, useRef} from 'react';
import {Recorder} from '@/component/Recorder';

export const DualVideoRecorder = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(prev => {
                if(prev) return prev;
                return stream;
            });
            videoRef.current!.srcObject = stream;
        }).catch(e => console.error('Stream error:', e));
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted />
            <Recorder stream={stream} />
            <Recorder stream={stream} />
        </div>
    );
};