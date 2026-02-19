
export interface LogoDTO {
  id: number;
  file_path: string;
  width: number;
  height: number;
  iso_639_1: string | null;
  aspect_ratio: number;
};

export interface Logo {
  filePath: string;
  aspectRatio: number;
};
