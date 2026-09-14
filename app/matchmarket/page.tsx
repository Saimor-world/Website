import MatchMarketClient from '@/components/matchmarket/MatchMarketClient';

export const metadata = {
  title: 'MATCHMARKET — Bundesliga Prediction Exchange',
  description: 'Live Bundesliga Prediction-Market-Simulation mit echten Spieldaten. Kein Echtgeld.',
};

export default function MatchMarketPage() {
  return <MatchMarketClient />;
}
