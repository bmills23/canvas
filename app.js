const canvas = document.querySelector('canvas')
const body = document.querySelector('body')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')


const woah = function () {
    setInterval(()=> {
    const r = Math.random()*256
    const g = Math.random()*256
    const b = Math.random()*256
    const x = Math.random()*window.innerWidth
    const y = Math.random()*window.innerHeight
    c.beginPath()
    c.arc(x, y, 20, 0, 2 * Math.PI)
    c.strokeStyle = `rgb(${r}, ${g}, ${b})`
    c.lineWidth = 10
    c.stroke()
}, 10)
}

woah()
