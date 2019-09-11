import React, { useState, useEffect } from "react"
import ClipboardJS from "clipboard"

import {Form, Input, Select, Option, ContainerDiv, SliderDiv, Output} from './Styled/sliderStyled'
import {slideHtml, slideCss, fadeHtml, fadeCss } from "../../Functions/Functions";

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
