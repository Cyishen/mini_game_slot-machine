(function () {

  const doors = document.querySelectorAll(".door");
  const items = [ "🍰", "💰", "🍼", "🍔" ];

  document.querySelector(".info").textContent = items.join("");
  document.querySelector("#spinner").addEventListener("click", spinButton);
  document.querySelector("#reseter").addEventListener("click", initButton);
  

  async function spinButton(e) {
    initButton(false, 1, 2);
    const results = [];

    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);

      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));

      const result = boxes.querySelector(".box").textContent;
      results.push(result);
    }


    if (results.every((val, i, arr) => val === arr[0] )) {
      alert("恭喜！連線成功！");
    }
  }
  

  function initButton(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = ["💰"];

      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          "transitionstart",
          // function () {
          //   door.dataset.spinned = "1";
          //   this.querySelectorAll(".box").forEach((box) => {
          //     box.style.filter = "blur(1px)";
          //   });
          // },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          // function () {
          //   this.querySelectorAll(".box").forEach((box, index) => {
          //     box.style.filter = "blur(0)";
          //     if (index > 0) this.removeChild(box);
          //   });
          // },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        
        boxesClone.appendChild(box);
      }
      
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${ door.clientHeight * (pool.length - 1) }px)`;
      
      door.replaceChild(boxesClone, boxes);
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  initButton();
})();
