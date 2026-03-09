import GenrePageClient from "@/src/components/connectors/pages/GenrePageClient";
import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";

export const GenrePage = () => {
  return (
    <ProtectedAuthentication>
      <GenrePageClient />
    </ProtectedAuthentication>
  );
}

export default GenrePage;
