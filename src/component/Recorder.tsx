import React, {useEffect, useRef, useState} from "react";
import {downloadFile} from "@/util/fileHandler";

interface VideoRecorderProps {
    stream: MediaStream | null;
}

export const Recorder: React.FC<VideoRecorderProps> = ({ stream }) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (stream && !mediaRecorderRef.current) {
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    const url = URL.createObjectURL(event.data);
                    downloadFile(url, `recording_${Date.now()}.webm`);
                }
            };
        }
    }, [stream]);

    const handleRecord = () => {
        if (mediaRecorderRef.current) {
            if (!isRecording) {
                mediaRecorderRef.current.start();
                setIsRecording(true);
            } else {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
            }
        }
    };

    return (
            <button onClick={handleRecord}>
                {isRecording ? '녹화 종료' : '녹화 시작'}
            </button>
    );
};