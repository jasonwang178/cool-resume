<template>
  <div class="index">
    <span id="echo"></span>
    <span id="heart"><i></i></span>
    <div class="navi">
      <router-link class="navlink" to="/resume/zh">简体中文</router-link> |
      <router-link class="navlink" to="/resume/en">English</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index'
  };
</script>

<style lang="css">

  .index {
    color: rgba(255, 255, 255, 0.8);
    background: #79C0DE;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 1;
    font-family: Helvetica Neue, Helvetica, sans-serif;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .navi{
    z-index: 1000;
    position: fixed;
    width: 200px;
    height: 20px;
    top: calc(100% - 150px);
    left: calc(50% - 79px);
  }
  .navi .navlink {
    font-family: Helvetica Neue, Helvetica, sans-serif;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
  }
  .navi .navlink:hover {
    color: #cc7b83;
  }

  /* Now we can build my heart */

  #heart, #echo {
    position: fixed;
    width: 300px;
    height: 300px;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    text-align: center;
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  }

  #heart {
    z-index: 8;
  }

  #echo {
    z-index: 7;
  }

  #heart::before, #heart::after, #echo::before, #echo::after {
    content: '';
    position: absolute;
    top: 40px;
    width: 150px;
    height: 240px;
    background: #c66c75;
    border-radius: 150px 150px 0 0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }

  #heart::before, #echo::before {
    left: 150px;
  }

  #heart::after, #echo::after {
    left: 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }

  /* It needs some depth  */

  #heart::after {
    box-shadow: inset -6px -6px 0px 6px rgba(255, 255, 255, 0.1);
  }

  #heart::before {
    box-shadow: inset 6px 6px 0px 6px rgba(255, 255, 255, 0.1);
  }

  /* Makin it mine. */

  #heart i::before {
    content: 'Welcome!';
    position: absolute;
    z-index: 9;
    width: 100%;
    top: 35%;
    left: 0;
    font-style: normal;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 100;
    font-size: 30px;
    text-shadow: -1px -1px 0px rgba(0, 0, 0, 0.2);
  }

  /*
   * Hearts gotta beat.
   */

  @-webkit-keyframes heartbeat {
    0%, 100% {
      -webkit-transform: scale(0.95);
      transform: scale(0.95);
    }
    50% {
      -webkit-transform: scale(1.00);
      transform: scale(1.00);
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.00);
    }
  }

  @-webkit-keyframes echo {
    0% {
      opacity: 0.1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1.4);
      transform: scale(1.4);
    }
  }

  @keyframes echo {
    0% {
      opacity: 0.1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.4);
    }
  }

  /*
   * Beautiful! Now for the beating...
   */

  #heart, #echo {
    -webkit-animation-duration: 2000ms;
    animation-duration: 2000ms;
    -webkit-animation-timing-function: cubic-bezier(0, 0, 0, 1.74);
    animation-timing-function: cubic-bezier(0, 0, 0, 1.74);
    -webkit-animation-delay: 500ms;
    animation-delay: 500ms;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
  }

  #heart {
    -webkit-animation-name: heartbeat;
    animation-name: heartbeat;
  }

  #echo {
    -webkit-animation-name: echo;
    animation-name: echo;
  }

  /*
   * Ready...
   */

  #heart, #echo {

    /*
     * ...set...
     */

    -webkit-animation-play-state: running;
    animation-play-state: running;

    /*
     * ...beat!
     */

  }
</style>
