document.addEventListener("DOMContentLoaded", () => {
    let colors = [/*'yellow',*/ 'violet', 'green', 'blue', 'red', 'orange'];
    let color = Math.floor(Math.random() * colors.length);
    document.getElementsByClassName('ticket')[0].style.backgroundColor = colors[color];
    document.getElementById('logautPlace').style.backgroundColor = colors[color];
});