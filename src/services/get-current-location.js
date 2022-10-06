export function getCurrentLoc() {

  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(pos => {
      const coords = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      resolve(coords)
    })
  })

  // window.navigator.geolocation.getCurrentPosition(pos => {
  //   const coords = {
  //     lat: pos.coords.latitude,
  //     lon: pos.coords.longitude
  //   }
  //   console.log({ coords })
  //   return coords
  // })
}