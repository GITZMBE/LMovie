import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import MoviePageClient from "@/src/components/connectors/pages/MoviePageClient";

export const MoviePage = () => {
  return (
    <ProtectedAuthentication>
      <MoviePageClient />
    </ProtectedAuthentication>
  );
}

export default MoviePage;
