import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * Root page - redirects to default locale
 * This handles the case when users visit the root URL directly
 * 
 * For GitHub Pages static export, this generates a static redirect page
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
