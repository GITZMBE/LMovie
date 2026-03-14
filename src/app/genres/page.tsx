import Link from "next/link";
import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import { Genre } from "@/src/models";
import PageContainer from "@/src/components/ui/PageContainer";

export const Genres = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/genres`, { cache: "no-cache" });
  const genres = await res.json() as Genre[];

  return (
    <ProtectedAuthentication>
      <PageContainer className="pt-12">
        <h1 className='text-xl sm:text-3xl font-bold text-white'>Genres</h1>
        <div className='flex flex-wrap gap-4 w-full py-4 text-white'>
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="
                group
                relative
                h-32
                w-48
                rounded-lg
                overflow-hidden
                bg-zinc-900
                hover:scale-105
                transition
              "
            >
              <div
                className="
                  w-full h-full
                  bg-cover bg-center
                  opacity-60
                  group-hover:opacity-100
                  transition
                "
                style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/t/p/original${genre.backdropPath})` }}
              />

              {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" /> */}

              <span className="absolute bottom-3 left-3 text-white font-semibold">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
        {children}
      </PageContainer>        
    </ProtectedAuthentication>
  );
};

export default Genres;