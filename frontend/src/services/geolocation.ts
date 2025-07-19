export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La géolocalisation n\'est pas supportée.'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}; 