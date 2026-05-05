import { redirect } from 'next/navigation';

export default function OwnerLoginRedirect() {
  redirect('/login?callbackUrl=/owner');
}
