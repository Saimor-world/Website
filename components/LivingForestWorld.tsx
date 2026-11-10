import RuhePage from '@/components/ruhe/RuhePage';

type Props = { locale: 'de' | 'en' };

export default function LivingForestWorld({ locale }: Props) {
  return <RuhePage locale={locale} />;
}
