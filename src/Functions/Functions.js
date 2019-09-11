export const slideHtml = a => {
  return `
  <div class="slider">
    <figure>
      ${[...Array(a)]
      .map((slide, i) => {
        return `<img src="images/pic${i + 1}" alt="" />
      `;
      })
      .join("")}<img src="images/pic1" alt="" />
    </figure>
  </div>
  
  `;
};

export const slideCss = a => {
  return `
  @keyframes slidy { ${[...Array(a)]
      .map((slide, i) => {
        return `
    ${((100 / a) * i).toFixed(0)}% { 
        left: ${i === 0 ? `0%` : `-${i}00%`};
    }
    ${((100 / a) * (i + 1) - 3).toFixed(0)}% {
        left: ${i === 0 ? `0%` : `-${i}00%`};
    }`;
      })
      .join("")}
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
    width: ${100 / (a + 1)}%;
    float: left;
  }
    
    `;
};

export const fadeHtml = a => {
  return `
  <div class="slider">
    ${[...Array(a)]
      .map((slide, i) => {
        return `<img src="images/pic${i + 1}" alt="" />
    `;
      })
      .join("")}</div>
  `;
};

export const fadeCss = a => {
  return `
  @keyframes fade {
    ${a}
  }
  `;
};
