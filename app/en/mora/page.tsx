import MoraProductPage from '@/components/MoraProductPage';

export const metadata = {
  title: 'Môra – proactive assistant inside Saimôr OS',
  description:
    'Môra is the proactive assistant inside Saimôr OS: she keeps context, notices relevant signals, prepares next steps and can act through system capabilities.',
};

export default function MoraPage() {
  return <MoraProductPage locale="en" />;
}
