const getImg = (imgSrc) => {
  const img = new Image();
  const defaultSrc = "/images/avatars/default.png";
  img.src = imgSrc;
  return img.height ? imgSrc : defaultSrc;
};

export default getImg;
