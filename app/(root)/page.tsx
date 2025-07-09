import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {getInterviewsByUserID, getLatestInterviews } from "@/lib/actions/auth.action"; 


async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    user?.id ? getInterviewsByUserID(user.id) : null,
    user?.id ? getLatestInterviews({ userId: user.id }) : null,
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col items-start gap-4 max-w-lg text-left">
          <h1 className="text-5xl font-extrabold animated-gradient-text drop-shadow-lg mb-1">
            No stress, just finesse — AI helps you impress.
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-200 via-blue-400 to-purple-400 rounded-full mb-2" />
          <p className="text-xl font-light italic text-primary-100 mb-4">
            Get ready for interviews with AI-powered practice
          </p>
          <Button asChild className="btn-primary max-sm:w-full mt-10">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* How it Works Section */}
      <section className="w-full flex flex-col items-center py-12">
        <h2 className="text-3xl font-bold mb-8">How it Works</h2>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center max-w-xs">
            <img src="/globe.svg" alt="Step 1" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Choose Your Role</h3>
            <p className="text-center text-light-100">Select the job or tech stack you want to practice for.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <img src="/robot.png" alt="Step 2" className="w-16 h-16 mb-4 rounded-full bg-white/80" />
            <h3 className="text-xl font-semibold mb-2">Practice with AI</h3>
            <p className="text-center text-light-100">Answer real interview questions and get instant feedback from AI.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <img src="/star.svg" alt="Step 3" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Improve & Succeed</h3>
            <p className="text-center text-light-100">Track your progress and get ready to ace your next interview!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full flex flex-col items-center py-12 bg-white/5 rounded-2xl my-8">
        <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
          <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center">
            <img src="/user-avatar.png" alt="User 1" className="w-14 h-14 rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">“This app made me so much more confident for my interviews. The AI feedback is spot on!”</p>
            <span className="font-semibold text-primary-100">— Alex J.</span>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center">
            <img src="/user-avatar.png" alt="User 2" className="w-14 h-14 rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">“I love how easy it is to practice for different tech roles. Highly recommend!”</p>
            <span className="font-semibold text-primary-100">— Priya S.</span>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center">
            <img src="/user-avatar.png" alt="User 3" className="w-14 h-14 rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">“The instant feedback helped me improve fast. I landed my dream job!”</p>
            <span className="font-semibold text-primary-100">— Sam T.</span>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="w-full flex flex-col items-center py-10">
        <h2 className="text-2xl font-bold mb-6">Practice for Top Companies</h2>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="h-12" />
          <img src="/covers/adobe.png" alt="Adobe" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="h-12" />
          <img src="/covers/hostinger.png" alt="Hostinger" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" className="h-12" />
          <img src="/covers/quora.png" alt="Quora" className="h-12" />
          <img src="/covers/reddit.png" alt="Reddit" className="h-12" />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id || ''}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={Array.isArray(interview.techstack) ? interview.techstack.join(', ') : interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
          {/* Dummy cards for visual fullness */}
          <InterviewCard
            key="dummy1"
            userId="dummyUser1"
            interviewId="dummyInterview1"
            role="Frontend Developer"
            type="Technical"
            techstack="React, TypeScript"
            createdAt="2024-05-01"
          />
          <InterviewCard
            key="dummy2"
            userId="dummyUser2"
            interviewId="dummyInterview2"
            role="Backend Engineer"
            type="Behavioral"
            techstack="Node.js, Express"
            createdAt="2024-04-20"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
          {/* Dummy cards for visual fullness */}
          <InterviewCard
            key="dummy4"
            userId="dummyUser4"
            interviewId="dummyInterview4"
            role="Data Scientist"
            type="Technical"
            techstack="Python, Pandas"
            createdAt="2024-05-10"
          />
          <InterviewCard
            key="dummy5"
            userId="dummyUser5"
            interviewId="dummyInterview5"
            role="DevOps Engineer"
            type="Behavioral"
            techstack="Docker, Kubernetes"
            createdAt="2024-04-28"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 flex flex-col items-center text-center text-light-100 mt-12 opacity-80">
        <div className="flex gap-4 mb-2">
          <a href="/" className="hover:underline">Home</a>
          <a href="/help" className="hover:underline">Help</a>
          <a href="/about" className="hover:underline">About</a>
        </div>
        <div className="text-sm">&copy; {new Date().getFullYear()} ClutchPrep-AI. All rights reserved.</div>
      </footer>
    </>
  );
}

export default Home;