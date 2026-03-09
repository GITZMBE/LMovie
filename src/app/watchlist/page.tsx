import WatchlistPageClient from "@/src/components/connectors/pages/WatchlistPageClient";
import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";

export const WatchlistPage = () => {
  return (
    <ProtectedAuthentication>
      <WatchlistPageClient />
    </ProtectedAuthentication>
  );
};

export default WatchlistPage;