import MoraProductPage from '@/components/MoraProductPage';

export const metadata = {
  title: 'MÔRA – proactive assistance inside Saimôr OS',
  description:
    'MÔRA works inside Saimôr OS with files, meetings, tasks and context. She keeps track of the current state, notices changes and can prepare next steps.',
};

export default function MoraPage() {
  return <MoraProductPage locale="en" />;
}
