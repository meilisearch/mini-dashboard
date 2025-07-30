import{j as o}from"./jsx-runtime-BO8uF4Og.js";import{R as x}from"./index-D4H_InIO.js";import{q as n}from"./styled-components.browser.esm-znzuwYFE.js";import{P as t}from"./index-LDOOE3Uh.js";import{C as i}from"./index-Ba0DhWvd.js";import{C as b}from"./Checkbox-BiBE8Zi2.js";import{a as y,l as j}from"./Speed-Cmh9zlf_.js";import"./Clickable-BApbfUri.js";import"./removeIndexFromArray-Op0ZOHre.js";import"./createEvent-BKVCMz0f.js";const T=n.label`
  width: 200px;
  height: 40px;
  background-color: ${e=>e.theme.colors.gray[10]};
  border-radius: 60px;
  display: flex;
  align-items: center;
  position: relative;
`,w=n(b)`
  width: 98px;
  height: 32px;
  margin: 0;
  background-color: white;
  border-radius: 60px;
  position: absolute;
  top: 4px;
  transform: translate(4px);
  transition: transform 300ms;
  &[aria-checked='false'] {
    transform: translate(98px);
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    border-radius: 60px;
    box-shadow: 0px 4px 6px ${e=>i(e.theme.colors.gray[0]).alpha(.11)};
  }
  &:focus {
    outline: none;
    &:before {
      box-shadow: 0px 0px 12px
        ${e=>i(e.theme.colors.gray[0]).alpha(.2)};
    }
  }
  -moz-appearance: initial;
`,l=n.span`
  height: 100%;

  width: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  &: hover {
    cursor: pointer;
  }
  transition: color 300ms;
  &:hover {
    color: ${e=>e.theme.colors.gray[0]};
  }
  color: ${e=>e.checked?e.theme.colors.gray[0]:e.theme.colors.gray[5]};
`,s=({onLabel:e="On",offLabel:c="Off",ariaLabel:p,onChange:m,initialValue:g=!0,...d})=>{const[a,h]=x.useState(g),u=()=>h(!a);return o.jsxs(T,{...d,children:[o.jsx(w,{checked:a,onChange:f=>{u(),m(f)},"aria-label":p}),o.jsx(l,{checked:a,children:e}),o.jsx(l,{checked:!a,children:c})]})};s.propTypes={onLabel:t.element,offLabel:t.element,ariaLabel:t.string,onChange:t.func,initialValue:t.bool};s.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{onLabel:{defaultValue:{value:"'On'",computed:!1},description:"Text displayed when toggle is on",type:{name:"element"},required:!1},offLabel:{defaultValue:{value:"'Off'",computed:!1},description:"Text displayed when toggle is off",type:{name:"element"},required:!1},initialValue:{defaultValue:{value:"true",computed:!1},description:"The initial state of the Toggle",type:{name:"bool"},required:!1},ariaLabel:{description:"Aria-label for toggler",type:{name:"string"},required:!1},onChange:{description:"Function to run when a change occurs",type:{name:"func"},required:!1}}};const F={title:"Components/Toggle",component:s},C=e=>o.jsx(s,{...e}),r=C.bind({});r.args={onLabel:o.jsxs(o.Fragment,{children:[o.jsx(j,{style:{marginRight:8,height:22}}),"Fancy"]}),offLabel:o.jsxs(o.Fragment,{children:[o.jsx(y,{style:{marginRight:8,height:22}}),"Json"]}),onChange:()=>{}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"args => <Toggle {...args} />",...r.parameters?.docs?.source}}};const D=["Default"];export{r as Default,D as __namedExportsOrder,F as default};
