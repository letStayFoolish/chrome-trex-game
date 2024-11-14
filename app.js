document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.querySelector("#alert");

  const gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;
  let position = 0;
  let score = 0;

  function control(e) {
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
  }

  document.addEventListener("keydown", control);

  function jump() {
    isJumping = true;

    let count = 0;

    let timerId = setInterval(() => {
      // move down
      if (count === 15) {
        clearInterval(timerId);

        let downTimerId = setInterval(() => {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }

          position -= 5;
          position = Math.round(position * gravity);
          count--;

          dino.style.bottom = position + "px";
        }, 20);
      }
      // move up
      position += 30;
      position = Math.round(position * gravity);
      count++;

      dino.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePosition = 1000;

      const obstacle = document.createElement("div");

      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      // Check if is game over
      let timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);
          alert.innerHTML = `Game over. Your score: ${score}`;
          isGameOver = true;
          // remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + "px";

        if (obstaclePosition === 0) {
          score++;
          alert.innerHTML = `Your score: ${score}`;
        }
      }, 20);

      setTimeout(generateObstacles, randomTime);
    }
  }

  generateObstacles();
});
