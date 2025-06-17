import React from 'react';
import Image from 'next/image'; // Assuming this is a Next.js app
import dayjs from 'dayjs';

interface InterviewCardProps {
    interviewId: string;
    userId: string;
    role: string;
    techstack: string;
    createdAt: string;
    type: string;
}

const getRandomInterviewCover = () => {
    // Placeholder function – replace with your actual logic
    return '/default-image.png';
};

const InterviewCard = ({ interviewId, userId, role, techstack, createdAt, type }: InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('YYYY-MM-DD HH:mm:ss');

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
