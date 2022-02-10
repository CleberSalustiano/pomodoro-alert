const form = document.querySelector('#formSet')
const timer = document.querySelector('#timer')
const alarm = document.querySelector('#timer audio')
let restTime = 300000

let interval
function set() {
  let totalTime = document.querySelector('#total-time')
  let focusTime = document.querySelector('#focus-time')
  if (totalTime.value === '') {
    window.alert('Preencha o campo "Tempo de Estudo"')
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
  interval = setInterval(() => {
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
          alarm.currentTime = 0
          alarm.play()
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
            1000
          )
        }, restTime)
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
const page = document.querySelector('html')
buttonComeçar.addEventListener('click', set)
window.addEventListener('keydown', event => {
  let isHidden = form.classList.value !== 'hidden'
  if (event.key === 'Enter' && isHidden) {
    set()
  }
  if (event.key === 'Escape' || event.key == 'Enter') {
    alarm.pause()
  }
})

const cancel = document.querySelector('#cancel')

cancel.addEventListener('click', () => {
  clearInterval(interval)
  form.classList.remove('hidden')
  timer.classList.add('hidden')
})

page.addEventListener('keydown', event => {
  if (event.key === ' ') {
    page.classList.toggle('dark')
  }
  console.log(event.key)
})
