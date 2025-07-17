import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action"; 


async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : null,
    user?.id ? getLatestInterviews({ userid: user.id }) : null,
  ]);

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = allInterview && allInterview.length > 0;

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
            <Image src="/globe.svg" alt="Step 1" width={64} height={64} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Choose Your Role</h3>
            <p className="text-center text-light-100">Select the job or tech stack you want to practice for.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <Image src="/robot.png" alt="Step 2" width={64} height={64} className="mb-4 rounded-full bg-white/80" />
            <h3 className="text-xl font-semibold mb-2">Practice with AI</h3>
            <p className="text-center text-light-100">Answer real interview questions and get instant feedback from AI.</p>
          </div>
          <div className="flex flex-col items-center max-w-xs">
            <Image src="/star.svg" alt="Step 3" width={64} height={64} className="mb-4" />
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
            <Image src="/user-avatar.png" alt="User 1" width={56} height={56} className="rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">"This app made me so much more confident for my interviews. The AI feedback is spot on!"</p>
            <span className="font-semibold text-primary-100">— Alex J.</span>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center">
            <Image src="/user-avatar.png" alt="User 2" width={56} height={56} className="rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">"I love how easy it is to practice for different tech roles. Highly recommend!"</p>
            <span className="font-semibold text-primary-100">— Priya S.</span>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg max-w-sm flex flex-col items-center">
            <Image src="/user-avatar.png" alt="User 3" width={56} height={56} className="rounded-full mb-3" />
            <p className="italic text-light-100 mb-2">"The instant feedback helped me improve fast. I landed my dream job!"</p>
            <span className="font-semibold text-primary-100">— Sam T.</span>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="w-full flex flex-col items-center py-10">
        <h2 className="text-2xl font-bold mb-6">Practice for Top Companies</h2>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" width={96} height={48} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" width={96} height={48} />
          <Image src="/covers/adobe.png" alt="Adobe" width={96} height={48} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" width={96} height={48} />
          <Image src="/covers/hostinger.png" alt="Hostinger" width={96} height={48} />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest" width={96} height={48} />
          <Image src="/covers/quora.png" alt="Quora" width={96} height={48} />
          <Image src="/covers/reddit.png" alt="Reddit" width={96} height={48} />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userid={user?.id || ''}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={Array.isArray(interview.techstack) ? interview.techstack.join(', ') : (interview.techstack || '')}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userid={user?.id || ''}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={Array.isArray(interview.techstack) ? interview.techstack.join(', ') : (interview.techstack || '')}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 flex flex-col items-center text-center text-light-100 mt-12 opacity-80">
        <div className="flex gap-4 mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/help" className="hover:underline">Help</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
        <div className="text-sm">&copy; {new Date().getFullYear()} ClutchPrep-AI. All rights reserved.</div>
      </footer>
    </>
  );
}

export default Home;