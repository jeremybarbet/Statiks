html,
body {
  max-height: 500px;
  overflow-x: hidden;
}

body {
  height: 500px;
  width: 325px;
  margin-top: 41px;
  background-color: @bg-white;
  font-family: @font;
  .font-smoothing(antialiased);
  .text-rendering(optimizelegibility);
}

.custom-scroll::-webkit-scrollbar {
  height: 10px;
  width: 2px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: darken(@gray, 15%);
  height: 40px;
}

.custom-scroll::-webkit-scrollbar-track {
  background-color: inherit;
}

::selection {
  background: #F5F8FA;
  color: #303940;
}

:focus { outline: 0; }

.donottouch {
  cursor: default;

  -webkit-user-select: none;
          user-select: none;
}

// Header
header {
  position: fixed;
  z-index: 100;
  background-color: @bg-white;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  border-bottom: 1px solid #ebebeb;
  .donottouch;

  // App name
  h1 {
    text-align: center;
    line-height: 38px;
    color: @gray;
  }

  // Settings btn
  .icon-reload,
  .icon-settings,
  .icon-back {
    display: none;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
    color: darken(#ebebeb, 25%);
    transition: all .3s ease;

    &:hover { color: darken(#ebebeb, 40%); }
  }

  .icon-back {
    width: 20px;
    left: 15px;
  }

  .icon-reload {
    right: 50px;
    font-size: 18px;

    &.inprogress {
      -webkit-animation: loader 0.5s infinite linear;
              animation: loader 0.5s infinite linear;
    }

    &.pause {
      -webkit-animation-play-state: paused;
              animation-play-state: paused;
    }
  }
}

// Alert
.alert {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 50;
  background: #303940;
  opacity: 0;

  p {
    text-align: center;
    color: @white;
    font-size: 14px;
    line-height: 18px;
    padding: 10px 15px;
  }
}

// Main content
.loading {
  padding-top: 160px;
  .donottouch;

  .loader {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    border: 1px solid @green;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 100%;
    -webkit-animation: loader 1s infinite linear;
            animation: loader 1s infinite linear;
  }

  p {
    position: relative;
    margin-top: 42%;
    text-align: center;
    color: @gray;
    font-size: 16px;

    span {
      font-family: "Droid Sans Mono", monospace;
      font-size: 12px;
      color: darken(@gray, 25%);
      letter-spacing: 0.5px;
      margin-right: 4px;
      border: 1px solid #DDD;
      background-color: #F8F8F8;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 2px;
    }
  }
}

.add-social {
  padding-top: 160px;
  cursor: pointer;

  .icon-add {
    width: 80px;
    height: 80px;
    text-align: center;
    margin: 0 auto 20px auto;
    font-size: 40px;
    line-height: 80px;
    display: block;
    color: @green;
    border: 1px solid @green;
    border-radius: 100%;
    transition: all .3s ease;
  }

  p {
    font-size: 18px;
    text-align: center;
    color: @gray;
    transition: all .3s ease;

    &.tuto {
      margin-top: 25px;
      font-size: 16px;

      span {
        font-family: "Droid Sans Mono", monospace;
        font-size: 12px;
        color: darken(@gray, 25%);
        letter-spacing: 0.5px;
        margin-right: 4px;
        border: 1px solid #DDD;
        background-color: #F8F8F8;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 2px;
      }
    }
  }

  &:hover {
    .icon-add {
      color: darken(@green, 10%);
      border-color: darken(@green, 10%);
    }

    p { color: darken(@gray, 10%); }
  }
}

.choose-social {
  display: none;

  ul li {
    position: relative;
    width: 100%;
    height: 100px;
    font-size: 45px;
    color: @white;
    line-height: 105px;
    text-align: center;
    cursor: pointer;
    transition: all .3s ease;

    .icon { font-size: 38px; }

    .icon-check,
    .icon-error,
    .icon-clear,
    .api-loader {
      position: absolute;
      right: 15px;
      font-size: 18px;
      top: 40px;
    }

    .icon-clear {
      border: 1px solid @white;
      width: 18px;
      height: 18px;
      transition: all .4s ease;
      border-radius: 18px;

      &:hover { box-shadow: inset 0 0 0 4px @white; }
    }

    .api-loader {
      width: 18px;
      height: 18px;
      border: 1px solid @white;
      border-top-color: transparent;
      border-left-color: transparent;
      transition: all .4s ease;
      border-radius: 18px;
      -webkit-animation: loader 1s infinite linear;
              animation: loader 1s infinite linear;
    }

    form {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      input[type="text"] {
        display: none;
        font-family: @font;
        font-weight: 300;
        color: @white;
        font-size: 24px;
        padding-left: 20px;
        position: absolute;
        left: 70px;
        width: 210px;
        height: 100%;
        background: none;
        border: none;
        box-sizing: border-box;
      }
    }

    &.btn-back {
      font-size: 16px;
      color: darken(@gray, 25%);
      line-height: 50px;
      height: 50px;

      &:hover { background-color: darken(@bg-white, 2%); }
    }

    &.dribbble {
      background-color: desaturate(#ea4c89, 5%);
      &:hover { background-color: darken(#ea4c89, 5%); }
    }
    &.twitter {
      background-color: desaturate(#55acee, 5%);
      &:hover { background-color: darken(#55acee, 5%); }
    }
    &.behance {
      background-color: desaturate(#1769ff, 5%);
      &:hover { background-color: darken(#1769ff, 5%); }
    }
    &.cinqcentpx {
      background-color: desaturate(#222222, 5%);
      &:hover { background-color: darken(#222222, 5%); }
    }
    &.github {
      background-color: desaturate(#4183c4, 5%);
      &:hover { background-color: darken(#4183c4, 5%); }
    }
    &.vimeo {
      background-color: desaturate(#1ab7ea, 5%);
      &:hover { background-color: darken(#1ab7ea, 5%); }
    }
    &.instagram {
      background-color: desaturate(#3f729b, 5%);
      &:hover { background-color: darken(#3f729b, 5%); }
    }
    &.pinterest {
      background-color: desaturate(#cc2127, 5%);
      &:hover { background-color: darken(#cc2127, 5%); }
    }
    &.youtube {
      background-color: desaturate(#e52d27, 5%);
      &:hover { background-color: darken(#e52d27, 5%); }
    }
    &.forrst {
      background-color: desaturate(#5b9a68, 5%);
      &:hover { background-color: darken(#5b9a68, 5%); }
    }
    &.soundcloud {
      background-color: desaturate(#f80, 5%);
      &:hover { background-color: darken(#f80, 5%); }
    }
    &.deviantart {
      background-color: desaturate(#4e6252, 5%);
      &:hover { background-color: darken(#4e6252, 5%); }
    }
  }
}

.list-social {
  display: none;
  .donottouch;

  > ul {
    .item {
      width: 100%;
      padding-bottom: 4px;
      color: @white;
      transition: box-shadow .3s ease;

      &.sort {
        cursor: move;
        position: relative;
        box-shadow: 0 0 8px fade(#303940, 40%);
      }

      &:hover {
        .left h2::after {
          width: 20px;
          transition: all .2s ease;
        }
      }

      .left,
      .right {
        display: inline-block;
        vertical-align: top;
        padding-bottom: 28px;
      }

      .left {
        width: 60%;
        padding-left: 15px;
        box-sizing: border-box;

        h2 {
          font-size: 24px;
          margin-top: 26px;
          margin-bottom: 4px;
          font-weight: 300;
          cursor: pointer;

          &::after {
            content: '';
            width: 0;
            height: 1px;
            margin-top: 5px;
            margin-left: 2px;
            background: @bg-white;
            display: block;
          }
        }

        p {
          font-size: 14px;
          color: fade(@white, 60%);
        }
      }

      .right {
        width: 40%;
        text-align: right;
        padding-right: 15px;
        box-sizing: border-box;

        .nbr {
          font-size: 24px;
          margin-top: 26px;
          margin-bottom: 4px;
          font-weight: 300;
        }

        p {
          font-size: 14px;
          color: fade(@white, 60%);

          span {
            font-family: "Droid Sans Mono", monospace;
            font-size: 12px;
            color: @white;
            margin-right: 4px;
            font-weight: bold;
          }
        }
      }

      &.total {
        color: #333;
        background-color: #f4f4f4;

        .left h2::after { background: @gray; }

        p {
          color: lighten(#333, 40%);
          span { color: #333; }
        }
      }

      &.dribbble { background-color: #ea4c89; }
      &.twitter { background-color: #55acee; }
      &.behance { background-color: #1769ff; }
      &.cinqcentpx { background-color: #222222; }
      &.github { background-color: #4183c4; }
      &.vimeo { background-color: #1ab7ea; }
      &.instagram { background-color: #3f729b; }
      &.pinterest { background-color: #cc2127; }
      &.youtube { background-color: #e52d27; }
      &.forrst { background-color: #5b9a68; }
      &.soundcloud { background-color: #f80; }
      &.deviantart { background-color: #4e6252; }
    }

    .detail-social {
      display: none;

      &.total {
        li { height: auto; }

        canvas {
          display: block;
          margin-left: 10px;
          padding-top: 10px;
        }
      }

      > li {
        color: darken(@gray, 10%);
        height: 40px;
        font-weight: 300;
        background-color: darken(@white, 2%);
        border-bottom: 1px solid darken(@white, 8%);

        &:last-child { border-bottom: 0; }

        .left,
        .right {
          display: inline-block;
          vertical-align: top;
          height: 100%;
        }

        .left {
          width: 60%;
          font-size: 12px;
          line-height: 44px;
          padding-left: 15px;
          text-transform: uppercase;
          box-sizing: border-box;
        }

        .right {
          width: 40%;
          font-size: 18px;
          line-height: 42px;
          text-align: right;
          padding-right: 15px;
          box-sizing: border-box;
        }
      }
    }
  }
}
