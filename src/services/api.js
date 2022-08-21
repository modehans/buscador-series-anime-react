const callToApi = (searchName) => {
  return fetch(`https://api.jikan.moe/v4/anime?q=${searchName}`)
    .then((response) => response.json())
    .then((response) => {
      const result = response.data.map(({ mal_id, title, images }) => {
        let newImage = '';
        if (
          images.jpg.image_url ===
          'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
        ) {
          newImage = `https://via.placeholder.com/256x256/816f9f/000000/?text=${title}`;
        } else {
          newImage = images.jpg.image_url;
        }
        return {
          id: mal_id,
          title: title,
          image: newImage,
        };
      });
      return result;
    });
};

export default callToApi;
