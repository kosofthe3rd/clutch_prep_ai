import { redirect } from 'next/navigation';

export default function HistoryRedirect() {
  redirect('/#your-interviews');
  return null;
} 