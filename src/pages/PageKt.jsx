import "./style_pagekt.css"

export default function PageKt() {
  return (
    <>
      <div id="container">
        <div id="topLine"></div>
        <div id="logoPan">
          {" "}
          <img
            src="images/logo.gif"
            width="192"
            height="92"
            alt=""
            id="logo"
          />{" "}
          <img
            src="images/slogan.gif"
            width="297"
            height="46"
            alt=""
            id="slogan"
          />{" "}
        </div>
        <div id="menuPan">
          <ul class="menu">
            <li class="btn_1">
              <a href="#">home page</a>
            </li>
            <li class="line"></li>
            <li class="btn_2">
              <a href="#">about us</a>
            </li>
            <li class="line"></li>
            <li class="btn_3">
              <a href="#">bouquets</a>
            </li>
            <li class="line"></li>
            <li class="btn_4">
              <a href="#">specials</a>
            </li>
            <li class="line"></li>
            <li class="btn_5">
              <a href="#">contacts</a>
            </li>
          </ul>
        </div>
        <div id="header">
          {" "}
          <img
            src="images/slogan2.gif"
            width="192"
            height="70"
            alt=""
            id="slogan2"
          />
        </div>
        <div id="content">
          <div id="leftPan">
            <div id="welcome">
              <h2></h2>
              <img
                src="images/img_welcome.jpg"
                width="172"
                height="56"
                alt=""
              />
              <p class="headline">
                Nam eu nulla. Donec lobortis purus vel urna. Nunc laoreet
                lacinia nunc.{" "}
              </p>
              <p>
                Nam eu nulla. Donec lobortis purus vel urna. Nunc laoreet
                lacinia nunc. In volutpat sodales ipsum. Sed vestibulum. Integer
                in ante. Sed Nunc laoreet lacinia nunc. In volutpat sodales{" "}
              </p>
            </div>
          </div>
          <div id="rightPan">
            <div id="featured">
              <h2></h2>
              <p class="headline">
                Nam eu nulla. Donec lobortis purus vel urna. Nunc laoreet
                lacinia nunc.Nam eu nulla. Donec lobortis purus vel urna. Nunc
                laoreet lacinia nunc. In volutpat sodales ipsum.{" "}
              </p>
              <div class="featItem" id="i01">
                {" "}
                <img
                  src="images/img_prod.jpg"
                  width="116"
                  height="125"
                  alt=""
                />
                <p>
                  <span class="headline2">Morbi volutpat leo in</span>
                  <br />
                  <a href="#">Nam eu nulla. Donec</a>
                  <br />
                  lobortis purus vel urna. Nunc laoreet lacinia nunc
                </p>
              </div>
              <div class="featItem" id="i02">
                {" "}
                <img
                  src="images/img_prod-13.jpg"
                  width="116"
                  height="125"
                  alt=""
                />
                <p>
                  <span class="headline2">Morbi volutpat leo in</span>
                  <br />
                  <a href="#">Nam eu nulla. Donec</a>
                  <br />
                  lobortis purus vel urna. Nunc laoreet lacinia nunc
                </p>
              </div>
              <div class="featItem" id="i03">
                {" "}
                <img
                  src="images/img_prod-14.jpg"
                  width="116"
                  height="125"
                  alt=""
                />
                <p>
                  <span class="headline2">Morbi volutpat leo in</span>
                  <br />
                  <a href="#">Nam eu nulla. Donec</a>
                  <br />
                  lobortis purus vel urna. Nunc laoreet lacinia nunc
                </p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear" id="end"></div>
        </div>
      </div>
      <div id="footer">
        <p>
          <a href="#">HOME PAGE</a> | <a href="#">ABOUT US</a> |{" "}
          <a href="#">BOUTQUETS</a> | <a href="#">SPECIALS</a> |{" "}
          <a href="#">NEWS</a> | <a href="#">CONTACTS</a>
          <br />
          Copyright &copy; Your Company Name | Design by{" "}
          <a href="http://freshtemplates.com/">Website Templates</a>
        </p>
      </div>
    </>
  );
}
