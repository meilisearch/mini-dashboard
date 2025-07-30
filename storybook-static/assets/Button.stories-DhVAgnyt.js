import{j as l}from"./jsx-runtime-BO8uF4Og.js";import{R as u}from"./index-D4H_InIO.js";import{B as d}from"./Button-By1jLGh9.js";import{S,a as v}from"./Speed-Cmh9zlf_.js";import"./index-Ba0DhWvd.js";import"./styled-components.browser.esm-znzuwYFE.js";import"./index-LDOOE3Uh.js";import"./index.esm-CT27t1GU.js";import"./Typography-CUKj5wrb.js";import"./Button-D-sgiqtp.js";import"./Clickable-BApbfUri.js";const z={title:"Components/Button",component:d,argTypes:{variant:{control:{type:"select",options:["default","filled","bordered","link","grayscale"]}},size:{control:{type:"select",options:["medium","small"]}}}},e=c=>{const[i,p]=u.useState(!1);return l.jsx(d,{"aria-expanded":i,onClick:()=>p(m=>!m),...c})},t=e.bind({});t.args={children:"I’m a Button"};const r=e.bind({});r.args={children:"I’m a Button",icon:l.jsx(S,{style:{width:19}})};const a=e.bind({});a.args={children:"I’m a Button",size:"small"};const o=e.bind({});o.args={children:"I’m a Button",size:"small",variant:"filled"};const s=e.bind({});s.args={children:"I’m a Button",size:"small",variant:"bordered"};const n=e.bind({});n.args={children:"I’m a Button",size:"small",variant:"link"};const g=e.bind({});g.args={children:"I’m a Button",icon:l.jsx(v,{style:{height:22}}),size:"small",variant:"grayscale",toggable:!0};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...n.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => {
  const [toggled, setToggled] = React.useState(false);
  return <Button aria-expanded={toggled} onClick={() => setToggled(prevtoggled => !prevtoggled)} {...args} />;
}`,...g.parameters?.docs?.source}}};const V=["Default","WithIcon","SizeSmall","VariantFilled","VariantBordered","VariantLink","VariantGrayscale"];export{t as Default,a as SizeSmall,s as VariantBordered,o as VariantFilled,g as VariantGrayscale,n as VariantLink,r as WithIcon,V as __namedExportsOrder,z as default};
