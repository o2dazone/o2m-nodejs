export function getTrackById(id, results) {
  for (let i = 0; i < results.length; i++) {
    if (results[i].id === id) {
      return results[i];
    }
  }
}
