<h5 class="loader" id="loader">
  <div
    class="min-h-[60]"
    style="align-items: center!important; justify-content: center!important; display: flex;"
  >
    <div style="width: 150px;">
      <svg
        version="1.1"
        id="L7"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xml:space="preserve"
      >
        <path
          fill="#173f5f"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          id="ring-1"
        />
        <path
          fill="#20639b"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
          id="ring-2"
        />
        <path
          fill="#3caea3"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5L82,35.7z"
          id="ring-3"
        />
      </svg>
    </div>
  </div>
</h5>

<style>
  #ring-1 {
    animation: loadRotate linear 2s infinite;
    -moz-animation: 2s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 2s linear 0s infinite;
  }

  #ring-2 {
    animation: loadRotate linear 1s infinite;
    -moz-animation: 1s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 1s linear 0s infinite;
  }

  #ring-3 {
    animation: loadRotate linear 2s infinite;
    -moz-animation: 2s linear 0s none infinite loadRotate;
    -webkit-animation: loadRotate 2s linear 0s infinite;
  }

  @keyframes loadRotate {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }

  @-moz-keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }

  @-webkit-keyframes spin {
    0% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
</style>
