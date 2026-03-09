import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import ProviderPageClient from "@/src/components/connectors/pages/ProviderPageClient";

export const ProviderPage = () => {
  return (
    <ProtectedAuthentication>
      <ProviderPageClient />
    </ProtectedAuthentication>
  );
}

export default ProviderPage;
