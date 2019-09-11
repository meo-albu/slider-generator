import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import ClipboardJS from "clipboard"

import {
  slideHtml,
  slideCss,
  fadeHtml,
  fadeCss
} from "../../Functions/Functions";

import hljs from "highlight.js/lib/highlight";
import "highlight.js/styles/atelier-cave-dark.css";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);

const Slider = () => {
  const [slides, setSlides] = useState(3);
  const [tip, setTip] = useState("slide");

  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  }, [slides, tip]);

  useEffect(() => {
    let clipboard = new ClipboardJS('.btn');

    clipboard.on('success', e => {
      e.trigger.children[1].classList.add('openedTooltip')
      setTimeout(() => {
        e.trigger.children[1].classList.remove('openedTooltip')
      }, 2000)

      e.clearSelection();
    });
  })

  const handleSubmit = e => {
    e.preventDefault();

    setSlides(parseInt(e.target.number.value));
    if (e.target.number.value === "") {
      setSlides(0);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    setTip(e.target.value);
  };

  return (
    <div className="slider">
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="number"
          placeholder="Type a number"
          background="rgba(255, 255, 255, 0.5)"
          color="#000"
        />
        <Input
          type="submit"
          value="Generate"
          background="#6348ff"
          color="white"
        />

        <Select onChange={handleChange}>
          <Option value="slide">Slide</Option>
          <Option value="fade">Fade</Option>
        </Select>
      </Form>

      <ContainerDiv>
        {tip === "slide" ? (
          <SliderDiv width={slides}>
            {[...Array(slides)].map((slide, i) => {
              return (
                <div key={i}>
                  <img src="https://source.unsplash.com/random" alt="dsds" />
                  <span>image {i + 1}</span>
                </div>
              );
            })}

            <div>
              <img src="https://source.unsplash.com/random" alt="dsds" />
              <span>image 1</span>
            </div>
          </SliderDiv>
        ) : (
            <p>to do fade</p>
          )}
      </ContainerDiv>

      <Output>
        <pre>
          <code className="hljs html" id="slideHtml">
            {tip === "slide" ? slideHtml(slides) : fadeHtml(slides)}
          </code>
          <button className="btn" data-clipboard-target="#slideHtml">
            <i class="fas fa-copy"></i><span>Copied!</span>
          </button>
        </pre>
        <pre>
          <code className="hljs css" id="slideCss">
            {tip === "slide" ? slideCss(slides) : fadeCss(slides)}
          </code>
          <button className="btn" data-clipboard-target="#slideCss">
            <i class="fas fa-copy"></i><span>Copied!</span>
          </button>
        </pre>
      </Output>
    </div>
  );
};

export default Slider;

// stiled components
const Form = Styled.form`
  padding: 40px;
  display: flex;
  justify-content: center
`;

const Input = Styled.input`
  display: block;
  margin: 0 -10px 0;
  padding: 10px 20px;
  border: 0;
  font-size: 15px;
  border-radius: 18px;
  background: ${props => props.background};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  color: ${props => props.color}

  &:focus {
    outline: 0
  }
`;

const Select = Styled.select`
  display: block;
  margin: 0 20px;
  padding: 10px 20px;
  border: 0;
  font-size: 15px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.5) !important;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const Option = Styled.option`
  background: rgba(255, 255, 255, 0.5);
  padding: 5px !important;
`;

const ContainerDiv = Styled.div`
  overflow: hidden;
  width: 70%;
  max-width: 700px;
  margin: 80px auto 80px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 650px) {
    width: auto;
    margin: 0 10px;
    height: 200px
  }
`;

const SliderDiv = Styled.div`
  width: ${({ width }) => width + 1}00%;
  display: flex;
  text-align: center;
  position: relative;
  animation: ${({ width }) => (width + 1) * 6}s slidy infinite;
  
  div {
    background: linear-gradient(to right, #6348ff, #addde2);
    color: #fff;
    font-size: 60px;
    line-height: 1;
    border: 3px solid #6348ff;
    position: relative;
    width: ${({ width }) => 100 / (width + 1)}%;
    height: 300px;

    span {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media only screen and (max-width: 650px) {
      height: 200px
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block
    }
  }

  @keyframes slidy {
    ${({ width }) =>
    [...Array(width)]
      .map((slide, i) => {
        return `
                ${((100 / width) * i).toFixed(0)}% {
                  left: ${i === 0 ? `0%` : `-${i}00%`};
                }
          
                ${((100 / width) * (i + 1) - 3).toFixed(0)}% {
                  left: ${i === 0 ? `0%` : `-${i}00%`};
                }
          `;
      })
      .join("")}

    100% {
      left: -${({ width }) => width}00%;
    }
  }
`;

const Output = Styled.div`
    display: flex;
    background: #19171c;

    pre {
      flex: 1;
      display: block;
      padding: 0 10px;
      position: relative;

      .btn {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 17px;
        padding: 8px 11px;
        background: #333;
        border: 0;
        color: #9d95c8;
        border-radius: 50%;
        cursor: pointer;
        z-index: 3;
        box-shadow: 2px 2px 10px #000

        &:focus {
          outline: 0;
        }

        span {
          position: absolute;
          top: 90%;
          opacity: 0;
          left: 50%;
          transform: translate(-50%);
          padding: 5px;
          border-radius: 5px;
          background: #222;
          color: #9d95c8;
          transition: 0.3s;
          z-index: -1;
          pointer-events: none;
          font-size: 12px;

          &:after {
            content: "^";
            position: absolute;
            color: #222;
            top: -10px;
            left: 50%;
            transform: translate(-50%);
            font-size: 30px;
          }
        }

        .openedTooltip {
          opacity: 1;
          top: 130%;
        }
      }

      &:first-of-type {
        border-right: 1px solid #999
      }

      code {
        margin: 0
      }
    }

    @media only screen and (max-width: 650px) {
      display: block;
      margin-top: 25px;
    }
`;
