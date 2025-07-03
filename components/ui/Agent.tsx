"use client"

import {useEffect, useState} from 'react'
import Image from "next/image"
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {vapi} from '@/lib/vapi.sdk'

interface SavedMessage{
    role: 'user' | 'system' | 'assistant';
    content: string;
}
enum CallStatus {
    INACTIVE ='INACTIVE',
    CONNECTING ='CONNECTING',
    ACTIVE ='ACTIVE',
    FINISHED ='FINISHED',
}
const Agent = ({userName, userId, type} : AgentProps) => {
    const router = useRouter();
    const[isSpeaking, setIsSpeaking] = useState(false);
    const[callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const[messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
        };
        const onMessage = (message: Message) =>{
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage: SavedMessage = { role: message.role, content: message.transcript }

                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => {
            setIsSpeaking(true);
        };
        const onSpeechEnd = () => {
            setIsSpeaking(false);
        };
        const onError = (error: Error) => {
            setCallStatus(CallStatus.INACTIVE);
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, [])
    useEffect(() => {

        if (callStatus === CallStatus.FINISHED) router.push('/');

    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        
        // Check if environment variables are missing
        if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
            alert('Missing VAPI web token. Please check your .env.local file.');
            setCallStatus(CallStatus.INACTIVE);
            return;
        }

        if (!process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID) {
            alert('Missing VAPI workflow ID. Please check your .env.local file.');
            setCallStatus(CallStatus.INACTIVE);
            return;
        }

        try {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues:{
                    userName: userName,
                    userid: userId,
                }
            });
        } catch (error) {
            alert(`Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setCallStatus(CallStatus.INACTIVE);
        }
    }
    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }



    const lastMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;


    return (
        <>
        <div className="call-view">
            <div className="card-interviewer">
                <div className="avatar">
                    < Image src="/ai-avatar.png" alt="vapi" width={200} height={200} className="object-cover" />
                    {isSpeaking && <span className="animate-speak"/> }
                </div>
                <h3>AI Interviewer </h3>
            </div>
            <div className="card-border">
                <div className="card-content">
                    <Image src="/user-avatar.png" alt="user-avatar" width={200} height={200} className="rounded-full object-cover size-{120px}" />
                    <h3>{userName} </h3>
                </div>
            </div>
        </div>
            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center gap-4">
                {callStatus !== 'ACTIVE' ? (
                    <button className="relative btn-call" onClick={handleCall}>
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>

                        <span>
                            {isCallInactiveOrFinished ? 'Call' : '. . .'}
                        </span>

                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                ) }
            </div>
        </>
    )
}
export default Agent
