import PersonPageClient from '@/src/components/connectors/pages/PersonPageClient';
import ProtectedAuthentication from '@/src/components/ui/auth/ProtectedAuthentication';

export const PersonPage = () => {
  return (
    <ProtectedAuthentication>
      <PersonPageClient />
    </ProtectedAuthentication>
  )
};

export default PersonPage;