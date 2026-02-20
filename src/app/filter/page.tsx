'use client';

import { fetchFilter } from "@/src/api";
import Poster from "@/src/components/ui/Poster";
import { Filter as IFilter, Genre, Video } from "@/src/models";
import { useCallback, useEffect, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";

const genresData: Genre[] = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const localesData: string[] = [
  "af-ZA",
  "ar-AE",
  "ar-BH",
  "ar-EG",
  "ar-IQ",
  "ar-JO",
  "ar-LY",
  "ar-MA",
  "ar-QA",
  "ar-SA",
  "ar-TD",
  "ar-YE",
  "be-BY",
  "bg-BG",
  "bn-BD",
  "br-FR",
  "ca-AD",
  "ca-ES",
  "ch-GU",
  "cs-CZ",
  "cy-GB",
  "da-DK",
  "de-AT",
  "de-CH",
  "de-DE",
  "el-CY",
  "el-GR",
  "en-AG",
  "en-AU",
  "en-BB",
  "en-BZ",
  "en-CA",
  "en-CM",
  "en-GB",
  "en-GG",
  "en-GH",
  "en-GI",
  "en-GY",
  "en-IE",
  "en-JM",
  "en-KE",
  "en-LC",
  "en-MW",
  "en-NZ",
  "en-PG",
  "en-TC",
  "en-US",
  "en-ZM",
  "en-ZW",
  "eo-EO",
  "es-AR",
  "es-CL",
  "es-DO",
  "es-EC",
  "es-ES",
  "es-GQ",
  "es-GT",
  "es-HN",
  "es-MX",
  "es-NI",
  "es-PA",
  "es-PE",
  "es-PY",
  "es-SV",
  "es-UY",
  "et-EE",
  "eu-ES",
  "fa-IR",
  "fi-FI",
  "fr-BF",
  "fr-CA",
  "fr-CD",
  "fr-CI",
  "fr-FR",
  "fr-GF",
  "fr-GP",
  "fr-MC",
  "fr-ML",
  "fr-MU",
  "fr-PF",
  "ga-IE",
  "gd-GB",
  "gl-ES",
  "he-IL",
  "hi-IN",
  "hr-HR",
  "hu-HU",
  "id-ID",
  "it-IT",
  "it-VA",
  "ja-JP",
  "ka-GE",
  "kk-KZ",
  "kn-IN",
  "ko-KR",
  "ku-TR",
  "ky-KG",
  "lt-LT",
  "lv-LV",
  "ml-IN",
  "mr-IN",
  "ms-MY",
  "ms-SG",
  "nb-NO",
  "nl-BE",
  "nl-NL",
  "no-NO",
  "pa-IN",
  "pl-PL",
  "pt-AO",
  "pt-BR",
  "pt-MZ",
  "pt-PT",
  "ro-MD",
  "ro-RO",
  "ru-RU",
  "si-LK",
  "sk-SK",
  "sl-SI",
  "so-SO",
  "sq-AL",
  "sq-XK",
  "sr-ME",
  "sr-RS",
  "sv-SE",
  "sw-TZ",
  "ta-IN",
  "te-IN",
  "th-TH",
  "tl-PH",
  "tr-TR",
  "uk-UA",
  "ur-PK",
  "uz-UZ",
  "vi-VN",
  "zh-CN",
  "zh-HK",
  "zh-SG",
  "zh-TW",
  "zu-ZA",
];
const yearsData = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (year) => year,
);

export const Filter = () => {
  const defaultData: IFilter = {
    genre: "28",
    pages: 1,
    locale: "en-US",
    year: new Date().getFullYear(),
  };
  const [formData, setFormData] = useState<IFilter>(defaultData);
  const optionsData = {
    genres: genresData,
    locales: localesData,
    years: yearsData,
  };
  const [videos, setVideos] = useState<Video[]>([]);

  const filterSearch = useCallback(async () => {
    const { genre, pages, locale, year } = formData;

    if (
      !genre ||
      !pages ||
      pages < 1 ||
      pages > 2000 ||
      !locale ||
      !year ||
      year > new Date().getFullYear() ||
      year < 1900
    )
      return;

    const vids = await fetchFilter(genre, pages, locale, year, 'movie')
    setVideos(vids);
  }, [formData]);

  useEffect(() => {
    // filterSearch();
  }, [filterSearch, formData]);

  return (
    <div id='filter' className='pt-23 sm:pt-headerHeight bg-primary'>
      <div className='px-12 min-h-screen'>
        <div className='flex flex-wrap gap-4 w-full pt-8 sm:pt-16 pb-4'>
          <select
            name=''
            id='genre'
            className='bg-secondary text-tertiary px-2 cursor-pointer'
            defaultValue={28}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, genre: e.target.value }))
            }
          >
            <option value='' className='text-gray-500'>
              Genre
            </option>
            {optionsData.genres.map((genre, index) => (
              <option key={index} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <input
            type='number'
            name=''
            id='page'
            className='bg-secondary text-tertiary pl-2 input-number-btn-none cursor-pointer'
            min={1}
            max={2000}
            value={formData.pages}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pages: +e.target.value }))
            }
          />
          <select
            name=''
            id='locale'
            className='bg-secondary px-2 text-tertiary hide-scrollbar cursor-pointer'
            defaultValue={"en-US"}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, locale: e.target.value }))
            }
          >
            <option value='' className='text-gray-500'>
              Language
            </option>
            {optionsData.locales.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            id='releaseYear'
            name=''
            defaultValue={new Date().getFullYear()}
            className='bg-secondary text-tertiary hide-scrollbar cursor-pointer'
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, year: +e.target.value }))
            }
          >
            <option value='' className='text-gray-500'>
              Release Year
            </option>
            {optionsData.years.map((year, index) => (
              <option
                key={new Date().getFullYear() - index}
                value={new Date().getFullYear() - index}
              >
                {new Date().getFullYear() - index}
              </option>
            ))}
          </select>
          <button
            className='flex items-center gap-4 px-2 text-gray-500 hover:text-tertiary bg-secondary hover:bg-quaternary rounded'
            onClick={filterSearch}
          >
            Filter <BsFilterSquare />
          </button>
        </div>
        <div className='flex flex-wrap justify-center sm:justify-start gap-4 w-full py-4'>
          {videos.map(({ id, type, title, description, posterPath, backdropPath, releaseDate, rating, genreIds }) => <Poster key={id} id={id} type={type} title={title} description={description} posterPath={posterPath} backdropPath={backdropPath} releaseDate={releaseDate} rating={rating} genreIds={genreIds} />)}
        </div>
      </div>
    </div>
  );
};

export default Filter;
