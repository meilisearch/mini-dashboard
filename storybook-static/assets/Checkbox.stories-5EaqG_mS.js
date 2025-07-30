import{j as o}from"./jsx-runtime-BO8uF4Og.js";import{R as m}from"./index-D4H_InIO.js";import{B as p}from"./Badge-DlnCUBSm.js";import{q as c}from"./styled-components.browser.esm-znzuwYFE.js";import{C as h}from"./Checkbox-BiBE8Zi2.js";import{T as u}from"./Typography-CUKj5wrb.js";import"./Clickable-BApbfUri.js";import"./removeIndexFromArray-Op0ZOHre.js";import"./createEvent-BKVCMz0f.js";import"./index-LDOOE3Uh.js";import"./index.esm-CT27t1GU.js";const i=c(h)`
  appearance: none;
  position: relative;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${e=>e.theme.colors.gray[7]};
  background-color: white;
  outline: none;
  cursor: pointer;
  transition:
    background-color 300ms,
    border-color 300ms;

  &[aria-checked='true'] {
    color: white;
    border-color: ${e=>e.theme.colors.main.default};
    background-color: ${e=>e.theme.colors.main.default};
    &:before {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10px;
    }
  }
`,l=c.label`
  transition: color 300ms;
  cursor: pointer;
  outline: none;
`,x=c.div`
  color: ${e=>e.theme.colors.gray[3]};

  display: flex;
  align-items: center;
  &:hover {
    color: ${e=>e.theme.colors.gray[0]};
  }

  ${i}:focus + ${l} {
    color: ${e=>e.theme.colors.gray[0]};
  }
`,a=({children:e,checked:t,onChange:s,label:n="checkbox",...d})=>o.jsxs(x,{...d,children:[o.jsx(i,{checked:t,onChange:s,id:n}),o.jsx(l,{htmlFor:n,children:e})]});a.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{defaultValue:{value:"'checkbox'",computed:!1},required:!1}}};const S={title:"Components/Checkbox",component:a},b=e=>{const[t,s]=m.useState(!1);return o.jsx(a,{checked:t,onChange:()=>s(!t),...e})},r=b.bind({});r.args={children:o.jsxs(o.Fragment,{children:[o.jsx(u,{variant:"typo2",mr:2,children:"Carrot cake"}),o.jsx(p,{children:"12349"})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} {...args} />;
}`,...r.parameters?.docs?.source}}};const q=["Default"];export{r as Default,q as __namedExportsOrder,S as default};
