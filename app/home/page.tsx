import { redirect } from 'next/navigation';
import { getOsBaseUrl } from '@/lib/os-links';

/** Canonical character navigation points to /home; the Website forwards to the existing OS. */
export default function OsHomeRedirect() {
  redirect(new URL('/home', getOsBaseUrl()).toString());
}
