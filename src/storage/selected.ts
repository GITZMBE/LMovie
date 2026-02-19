import { Video } from "../models";

export const saveSelectedVideo = (video: Video) => {
  localStorage.setItem("selectedVideo", JSON.stringify(video));
};

export const getSelectedVideo = () => {
  const selectedVideo = localStorage.getItem("selectedVideo");
  if (!selectedVideo) return null;
  return JSON.parse(selectedVideo) as Video;
};
