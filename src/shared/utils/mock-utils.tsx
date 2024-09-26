export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getMockRestaurantImgSrc = () => {
  return `src/assets/restaurant/restaurant-img-${
    Math.floor(Math.random() * 3) + 1
  }.jpg`;
};
