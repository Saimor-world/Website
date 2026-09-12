import SystemWorldHome from '@/components/SystemWorldHome';

type Props = { locale: 'de' | 'en' };

export default function LivingForestWorld({ locale }: Props) {
  return <SystemWorldHome locale={locale} />;
}
