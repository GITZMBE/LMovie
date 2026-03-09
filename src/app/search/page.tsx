import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import SearchPageClient from "@/src/components/connectors/pages/SearchPageClient";
import { Suspense } from "react";

export const SearchPage = () => {
  return (
    <ProtectedAuthentication>
      <Suspense>
        <SearchPageClient />
      </Suspense>
    </ProtectedAuthentication>
  );
}

export default SearchPage;