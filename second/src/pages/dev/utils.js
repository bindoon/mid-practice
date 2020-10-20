/* eslint-disable array-callback-return */
// eslint-disable-next-line import/prefer-default-export
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getDataIdx = (list, key) => list.findIndex((item) => {
  if (item.id === key) {
    return true;
  }
});
