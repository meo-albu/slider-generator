import React, { useState, useEffect } from "react"
import ClipboardJS from "clipboard"

import {Form, Input, Select, Option, ContainerDiv, SliderDiv, Output, FadeDiv} from './Styled/sliderStyled'
import {slideHtml, slideCss, fadeHtml, fadeCss } from "../../Functions/Functions";

import hljs from "highlight.js/lib/highlight";
import "highlight.js/styles/atelier-cave-dark.css";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/css";
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);


const Slider = () => {
  const images = [
    'https://images.unsplash.com/photo-1566152512782-717898024877?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567368407227-719ba57067a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1566226677912-c333af37181f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567204128018-85ac47edc3c9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1566963774824-6316020a6c41?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1566187600049-f7ef43360090?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567983491650-fc1a38cb1ce5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567615882365-88ef29b532c2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1565846668875-b02f7b2d0657?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567658053979-515e5058b1d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1567527024036-4cb4a9c6ac03?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1565903613605-fff55588ae70?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1565607871901-e4d852cfde3d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1566681855366-75a2da1c7221?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1566995633499-d74ccf6cddd2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
  ]
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
            <FadeDiv imagini={slides}>
              <div>
              {[...Array(slides)].map((slide, i) => {
              return (
                <div key={i}>
                  <img src={images[i]} alt="dsds" />
                  <span>image {i + 1}</span>
                </div>
              );
            })}
              </div>
            </FadeDiv>
          )}
      </ContainerDiv>

      <Output>
        <pre>
          <code className="hljs html" id="slideHtml">
            {tip === "slide" ? slideHtml(slides) : fadeHtml(slides)}
          </code>
          <button className="btn" data-clipboard-target="#slideHtml">
            <i className="fas fa-copy"></i><span>Copied!</span>
          </button>
        </pre>
        <pre>
          <code className="hljs css" id="slideCss">
            {tip === "slide" ? slideCss(slides) : fadeCss(slides)}
          </code>
          <button className="btn" data-clipboard-target="#slideCss">
            <i className="fas fa-copy"></i><span>Copied!</span>
          </button>
        </pre>
      </Output>
    </div>
  );
};

export default Slider;
