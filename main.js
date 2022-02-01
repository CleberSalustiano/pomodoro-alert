function set() {
  let totalTime = document.querySelector('#total-time')
  let focusTime = document.querySelector('#focus-time')

  if (totalTime.value === '') {
    window.alert('Preencha o campo "Tempo de Estudo"')
  } else if (focusTime.value <= 24) {
    focusTime.value = ''
  } else {
    focusTime = focusTime.value
    totalTime = totalTime.value
    if (focusTime === '') {
      focusTime = 25
    }
    start(totalTime, focusTime)
  }
}

function start(total, focus) {
  const form = document.querySelector('#formSet')
  const timer = document.querySelector('#timer')
  const alarm = document.querySelector('#timer audio')
  form.classList.add('hidden')
  timer.classList.remove('hidden')
  timer.querySelector('p').classList.remove('finish')

  let repetitions = Math.floor(total / focus)
  focus = 60 * focus
  let focusTime = focus
  let index = 0

  print(focusTime, timer)
  focusTime--
  recursiveTimer(
    focusTime,
    focus,
    timer,
    index,
    repetitions,
    form,
    timer,
    alarm
  )
}

function recursiveTimer(
  focusTime,
  focus,
  timer,
  index,
  repetitions,
  form,
  timer,
  alarm
) {
  let interval = setInterval(() => {
    let hour = parseInt((focusTime / 60 / 60) % 24, 10)
    let minute = parseInt((focusTime / 60) % 60, 10)
    let second = parseInt(focusTime % 60, 10)
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    if (hour === '0') {
      timer.querySelector('p').textContent = ':' + minute + ':' + second
    } else {
      timer.querySelector('p').textContent = hour + ':' + minute + ':' + second
    }
    focusTime--
    if (focusTime === -1) {
      if (index === repetitions) {
        form.classList.remove('hidden')
        timer.classList.add('hidden')
        clearInterval(interval)
      } else {
        setTimeout(() => {
          setInterval(
            recursiveTimer(
              focusTime,
              focus,
              timer,
              index,
              repetitions,
              form,
              timer,
              alarm
            ),
            1
          )
        }, 300000)
        alarm.play()
        timer.querySelector('p').textContent = 'Pause 5 minutos'

        clearTimeout(interval)
        index++
        focusTime = focus
      }
    }
  }, 1000)
}

function print(focusTime, timer) {
  let hour = parseInt((focusTime / 60 / 60) % 24, 10)
  let minute = parseInt((focusTime / 60) % 60, 10)
  let second = parseInt(focusTime % 60, 10)
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  if (hour === '0') {
    timer.querySelector('p').textContent = ':' + minute + ':' + second
  } else {
    timer.querySelector('p').textContent = hour + ':' + minute + ':' + second
  }
}
const buttonComeçar = document.querySelector('#form #formSet button')
const alarm = document.querySelector('#timer audio')
buttonComeçar.addEventListener('click', set)
window.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    set()
  }
})

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    alarm.pause()
  }
})
