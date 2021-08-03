export function loadArray(data, key) {
  const array = []
  for (let i = 0; i < data.length; i++) {
    array.push(data[i][key])
  }
  array.sort(function (a, b) {
    return a - b
  })
  return array
}
