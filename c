<!DOCTYPE html>
<html>
  <head>
    <style>
      .progress-ring {
        position: relative;
        display: inline-block;
        width: 120px;
        height: 120px;
        font-size: 24px;
        text-align: center;
      }

      .progress-ring__circle {
        transform: rotate(-90deg);
      }

      .progress-ring__circle--bg {
        fill: none;
        stroke: #ccc;
        stroke-width: 6;
      }

      .progress-ring__circle--progress {
        fill: none;
        stroke: #00c4ff;
        stroke-width: 6;
        stroke-dasharray: 339.292; /* (圆的周长 - 圆环的长度) * 0.01 */
        stroke-dashoffset: 339.292; /* 圆的周长 - 圆环的长度 */
        transition: stroke-dashoffset 0.5s ease-in-out;
      }

      .progress-ring__text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .progress-ring__value {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="progress-ring">
      <svg class="progress-ring__circle" width="120" height="120">
        <circle
          class="progress-ring__circle--bg"
          r="54"
          cx="60"
          cy="60"
        ></circle>
        <circle
          class="progress-ring__circle--progress"
          r="54"
          cx="60"
          cy="60"
        ></circle>
      </svg>
      <div class="progress-ring__text">
        <span class="progress-ring__value">0</span>
        <span class="progress-ring__unit">%</span>
      </div>
    </div>
  </body>
  <script>
    function setProgress(percent) {
      const circle = document.querySelector(".progress-ring__circle--progress");
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      circle.style.strokeDashoffset = offset;
      document.querySelector(".progress-ring__value").textContent = percent;
    }
    setProgress(90);
  </script>
</html>
