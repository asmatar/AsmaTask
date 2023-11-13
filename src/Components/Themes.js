import { createGlobalStyle } from 'styled-components'
export const lightTheme = {
  colorText: '#363537',
  colorTextSecondary: '#FFFFFF',
  colorLang: '#FFFFFF',
  colorBlue: '#a881ff',
  background: 'linear-gradient(to right, #b6fbff, #83a4d4)',
  shadowColor: 'rgba(0, 0, 0, 0.04)',
  colorButtonLogin: '#FFF',
}
export const darkTheme = {
  colorText: '#FFF',
  colorLang: '#FFFFFF',
  background: 'linear-gradient(to right, #434343 0%, black 100%)',
  colorTextSecondary: '#828282',
  shadowColor: 'rgba(255, 255, 255, 0.04)',
}
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.colorText};
    transition: all 0.2s ease-in; 
  }


  html,body,  div,  span,  applet,  object,  iframe,  h1,
  h2,  h3,  h4,  h5,
  h6,  p,  blockquote,  pre,  a,  abbr,  acronym,  address,  big,  cite,  code,  del,  dfn,  em,  img,  ins,
  kbd,  q,  s,  samp,
  small,  strike,  strong,  sub,
  sup,  tt,  var,  b,
  u,  i,  center,  dl,
  dt,  dd,
  ol,  ul,
  li,fieldset,
  form,label,legend,table,caption,
  tbody,tfoot,thead,tr,th,td,
  article,aside,
  canvas,details,
  embed,figure,
  figcaption,footer,
  header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  font-family: 'Lora', serif;
  font-weight: 300;
}
a {
  text-decoration: none;
}
`
