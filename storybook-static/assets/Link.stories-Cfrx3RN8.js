import{j as s}from"./jsx-runtime-BO8uF4Og.js";import"./index-D4H_InIO.js";import{q as c}from"./styled-components.browser.esm-znzuwYFE.js";import{P as t}from"./index-LDOOE3Uh.js";const d=c.a`
  color: ${e=>e.color||e.theme.colors.main.default};
  text-decoration: underline;
  transition: color 300ms;
  outline: none;
  &:hover,
  &:focus {
    color: ${e=>e.theme.colors.main.hover};
  }
`,o=({href:e,target:n="_blank",children:i,...a})=>s.jsx(d,{href:e,target:n,rel:"noreferrer",...a,children:i});o.propTypes={href:t.string,target:t.string,children:t.node};o.__docgenInfo={description:"",methods:[],displayName:"Link",props:{target:{defaultValue:{value:"'_blank'",computed:!1},description:"How the user should be redirected",type:{name:"string"},required:!1},href:{description:"The link where the user should be redirected",type:{name:"string"},required:!1},children:{description:"The text that should be cliquable",type:{name:"node"},required:!1}}};const f={title:"Components/Link",component:o},l=e=>s.jsx(o,{...e}),r=l.bind({});r.args={href:"https://docs.meilisearch.com/",children:"Go to documentation"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"args => <Link {...args} />",...r.parameters?.docs?.source}}};const g=["Default"];export{r as Default,g as __namedExportsOrder,f as default};
