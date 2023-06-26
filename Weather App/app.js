
window.addEventListener('load', () => {
  let long
  let lat
  const temperatureCaption = document.querySelector('.temperature-description')
  const temperatureNumber = document.querySelector('.temperature-degree')
  const proximityTimezone = document.querySelector('.location-timezone')
  const temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

      window.fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently
          // Set DOM elements from the API
          temperatureNumber.textContent = temperature
          temperatureCaption.textContent = summary
          proximityTimezone.textContent = data.timezone

          // FORUMLA FOR CELSIUS
          let celsius = (temperature - 32) * (5 / 9)
          // Set icon
          setIcons(icon, document.querySelector('.icon'))

          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C'
              temperatureNumber.textContent = Math.floor(celsius)
            } else {
              temperatureSpan.textContent = 'F'
              temperatureNumber.textContent = temperature
            }
          })
        })
    })
  }

  function setIcons (icon, iconID) {
    const skycons = new Skycons({ color: 'white' })
    const currentIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
  }
})
