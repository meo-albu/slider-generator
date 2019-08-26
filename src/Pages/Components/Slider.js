import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/atelier-cave-dark.css';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

const HTML = (a) => {
  return `
<div class="slider">
  <figure>
    ${
    [...Array(a)].map((slide, i) => {
      return `<img src="images/pic${i + 1}" alt="" />
    `}).join('')}<img src="images/pic1" alt="" />
  </figure>
</div>

`
}

const CSS = (a) => {
  return `
@keyframes slidy { ${[...Array(a)].map((slide, i) => {
    return `
  ${(100 / a * i).toFixed(0)}% { 
      left: ${i === 0 ? `0%` : `-${i}00%`};
  }
  ${(100 / a * (i + 1) - 3).toFixed(0)}% {
      left: ${i === 0 ? `0%` : `-${i}00%`};
  }`
  }).join('')
    }
  100% {
      left: -${a}00%;
  }
}

.slider {
  overflow: hidden;
}

.slider figure {
  position: relative;
  width: ${a + 1}00%;
  margin: 0;
  left: 0;
  text-align: left;
  font-size: 0;
  animation: ${a * 6}s slidy infinite;
}

figure img {
  width: ${(100 / (a + 1))}%;
  float: left;
}
  
  `
}

const Slider = () => {
  const [slides, setSlides] = useState(3)

  useEffect(() => {
    console.log(slides)
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [slides])

  const handleSubmit = e => {
    e.preventDefault()

    setSlides(parseInt(e.target.number.value))
    if (e.target.number.value === '') {
      setSlides(0)
    }
  }



  return (
    <div className="slider">
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="number" placeholder="Type a number" background="rgba(255, 255, 255, 0.5)" color="#000" />
        <Input type="submit" value="Generate" background="#6348ff" color="white" />
      </Form>

      <ContainerDiv>
        <SliderDiv width={slides}>
          {
            [...Array(slides)].map((slide, i) => {
              return <div key={i}><img src="https://source.unsplash.com/random" alt='dsds' /></div>
            })
          }
        </SliderDiv>
      </ContainerDiv>

      <Output>
        <pre><code className="hljs html">
          {HTML(slides)}
        </code></pre>
        <pre><code className="hljs css">
          {CSS(slides)}
        </code></pre>
      </Output>
    </div>
  )
}

export default Slider

const Form = Styled.form`
  padding: 40px;
  display: flex;
  justify-content: center
`

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
`

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
`

const SliderDiv = Styled.div`
  width: ${({ width }) => width}00%;
  display: flex;
  text-align: center;
  position: relative;
  animation: ${({ width }) => width * 6}s slidy infinite;
  
  div {
    background: linear-gradient(to right, #6348ff, #addde2);
    color: #fff;
    font-size: 60px;
    border: 3px solid #6348ff;
    width: ${({ width }) => 100 / width}%;
    height: 300px;

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
    ${ ({ width }) =>
    (
      [...Array(width)].map((slide, i) => {
        let dd = `
                ${(100 / width * i).toFixed(0)}% {
                  left: -${i}00%;
                }
          
                ${(100 / width * (i + 1) - 4).toFixed(0)}% {
                  left: -${i}00%;
                }
              `
        return dd.replace(',', '')
      })
    )
  }

    100% {
      -${({ width }) => width}00%;
    }
  }
`

const Output = Styled.div`
    display: flex;
    background: #19171c;

    pre {
      flex: 1;
      display: block;
      padding: 0 10px;

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
`