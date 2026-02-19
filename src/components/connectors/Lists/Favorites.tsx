import Draggable from "../../ui/Draggable";
import { useRecoilValue } from "recoil";
import { FavoriteMoviesState } from "../../../states";
import Poster from "../../ui/Poster";

function Favorites() {
  const favorites = useRecoilValue(FavoriteMoviesState);

  return favorites && favorites.length ? (
    <div className='py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>Favorites</h2>
      <Draggable>
        <div className='flex gap-4'>
          {favorites.map(
            ({ id, type, title, posterPath, backdropPath, description, releaseDate, rating, genreIds }) => (
              <Poster
                key={id}
                id={id}
                type={type}
                posterPath={posterPath}
                backdropPath={backdropPath}
                description={description}
                genreIds={genreIds}
                title={title}
                releaseDate={releaseDate}
                rating={rating}
              />
            ),
          )}
        </div>
      </Draggable>
    </div>
  ) : (
    <></>
  );
}

export default Favorites;
