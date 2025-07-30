import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{r as h}from"./index-D4H_InIO.js";import{q as a}from"./styled-components.browser.esm-znzuwYFE.js";import{C as u}from"./index-Ba0DhWvd.js";import{P as x}from"./index-LDOOE3Uh.js";import{I as f}from"./IconButton-D_x5RvMH.js";import{b as g,n as y}from"./Speed-Cmh9zlf_.js";import"./index.esm-CT27t1GU.js";import"./theme-DqhZBUSA.js";const b=a.input`
  height: 48px;
  width: 100%;
  padding-left: ${o=>o.$hasIcon?"48px":"8px"};
  padding-right: 8px;
  background-position: top 50% left 16px;
  border-color: ${o=>o.theme.colors.gray[10]};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${u("#000").alpha(.04)};
  transition: border-color 300ms;
  outline: none;
  color: ${o=>o.theme.colors.gray[0]};
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  ::placeholder {
    color: ${o=>o.theme.colors.gray[7]};
  }

  &:hover {
    border-color: ${o=>o.theme.colors.gray[8]};
  }

  &:focus {
    border-color: ${o=>o.theme.colors.main.default};
    svg {
      fill: ${o=>o.theme.colors.main.default};
    }
  }

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`,I=a(f)`
  svg {
    width: 11px;
    height: 11px;
  }
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: ${o=>o.theme.colors.gray[5]};
`,$=a.div`
  position: relative;
  display: inline-block;

  > svg {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
`,s=({icon:o,ref:l,clear:d,type:n,value:i,...m})=>{const p=h.useRef(null);return e.jsxs($,{ref:l,style:{width:"100%"},children:[o,e.jsx(b,{$hasIcon:o,value:i,type:n,ref:p,...m}),n==="search"&&e.jsx(I,{"aria-label":"clear",onClick:()=>{d(),p.current.focus()},style:{display:i?"block":"none"},children:e.jsx(g,{})})]})};s.propTypes={icon:x.node};s.__docgenInfo={description:"",methods:[],displayName:"Input",props:{icon:{description:"Icon you want to appear inside the input, on the left",type:{name:"node"},required:!1}}};const E={title:"Components/Input",component:s},c=o=>e.jsx(s,{type:"search",...o,style:{maxWidth:300}}),r=c.bind({}),t=c.bind({});t.args={icon:e.jsx(y,{style:{width:20}})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => <Input type="search" {...args} style={{
  maxWidth: 300
}} />`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => <Input type="search" {...args} style={{
  maxWidth: 300
}} />`,...t.parameters?.docs?.source}}};const T=["Default","WithIcon"];export{r as Default,t as WithIcon,T as __namedExportsOrder,E as default};
