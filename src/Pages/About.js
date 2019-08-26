import React from 'react'
import Styled from 'styled-components'

const About = () => {
  return (
    <AboutPage>
      <h3>About Slider Generator</h3>

      <p>Version 1.0.0</p>
      <p>Built with <a href="http://reactjs.org" rel="noopener noreferrer" target="_blank">React.js</a>, <a href="https://www.styled-components.com/" rel="noopener noreferrer" target="_blank">Styled Components</a>, <a href="https://highlightjs.org" rel="noopener noreferrer" target="_blank">Highlight.js</a></p>
    </AboutPage>
  )
}

export default About


const AboutPage = Styled.div`
  min-height: calc(100vh - 274px);
  margin: 120px 50px;
  position: relative;

  p {
    margin: 0 0 15px
  }

  h3 {
    font-size: 30px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 80px
  }
`