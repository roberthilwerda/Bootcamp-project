import "./ArtistSlider.css";
import React from "react";

// const genreObj = {
//   jazz: {
//     image: require("../components/images/jazz.png"),
//     tag: "JAZZ",
//   },
//   pop: {
//     image: require("../components/images/pop.png"),
//     tag: "POP",
//   },
// };

const ArtistSlider = (props) => {
  const artists = [
    { id: 1, name: "Artist-1", image_ref: "" },
    { id: 2, name: "Artist-2", image_ref: "" },
    { id: 3, name: "Artist-3", image_ref: "" },
    { id: 4, name: "Artist-4", image_ref: "" },
    { id: 5, name: "Artist-5", image_ref: "" },
    { id: 6, name: "Artist-6", image_ref: "" },
  ];

  const img =
    "https://i.scdn.co/image/ab6761610000e5eb82a5d58059f81867b871d8b6";

  return (
    <div>
      <div className="artist_slider__redirect">
        Click on an artist to view in Spotify
      </div>
      <div onClick={() => {}} className="artist_slider__wrapper">
        {artists.map((artist) => {
          return (
            <div className="artist_card" key={artist.id}>
              <img alt="" className="artist_image" src={img}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistSlider;
