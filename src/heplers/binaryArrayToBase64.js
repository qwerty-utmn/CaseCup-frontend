const convertImageSrc = (arrayBufferView) => {
  // const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
  // const blob = new Blob(window.btoa(arrayBufferView), { type: 'image/jpeg' });
  // const urlCreator = window.URL || window.webkitURL;
  // const imageUrl = urlCreator.createObjectURL(blob);
  const imageUrl = arrayBufferView ? `data:image/jpeg;base64,${arrayBufferView}` : '';

  return imageUrl;
};
export default convertImageSrc;
