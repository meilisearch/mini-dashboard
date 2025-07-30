import{j as e}from"./jsx-runtime-BO8uF4Og.js";import{R as n}from"./index-D4H_InIO.js";import{B as l}from"./Box-pJ1DCIgP.js";import{C as w}from"./index-Ba0DhWvd.js";import{q as i}from"./styled-components.browser.esm-znzuwYFE.js";import{P as c}from"./index-LDOOE3Uh.js";import{e as I,p as C}from"./Speed-Cmh9zlf_.js";import{u as D,D as B,a as R}from"./Disclosure-BpSKb0FX.js";import"./index.esm-CT27t1GU.js";import"./Clickable-BApbfUri.js";import"./Button-D-sgiqtp.js";const k=i.div`
  background-color: white;
  flex-shrink: 0;
  width: 300px;
  display: flex;
  overflow: auto;
  box-shadow: 0px 0px 30px ${r=>w(r.theme.colors.gray[0]).alpha(.07)};
  position: relative;
  margin-left: -246px;
  transition: margin-left 300ms;
  position: sticky;
  top: 0;
  height: 100%;

  &[aria-expanded='true'] {
    margin-left: 0px;
  }
`,u=i(I)`
  width: 18px;
  height: 9px;
  transition: color 300ms;
`,q=i.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms;
`,g=i(B)`
  position: absolute;
  top: 24px;
  right: 12px;
  z-index: 1;
  cursor: pointer;
  padding: 6px;
  background-color: transparent;
  border: 0;

  svg {
    color: ${r=>r.theme.colors.gray[7]};
    transition: color 300ms;
  }
  &:hover,
  &:focus {
    outline: none;

    svg {
      color: ${r=>r.theme.colors.main.default};
    }
  }
`,T=i(R)`
  transition:
    opacity 300ms ease-in-out,
    transform 300ms ease-in-out;
  opacity: 0;
  height: 100%;
  width: 100%;
  transform: translateX(-100%);
  &[data-enter] {
    opacity: 1;
    transform: translateX(0);
  }
`,d=({sidebarIcon:r=e.jsx(u,{style:{transform:"rotate(270deg)"}}),visible:x=!0,onChange:b=()=>{},children:y,...v})=>{const o=D({animated:!0,visible:x}),[j,f]=n.useState(!1),S=r||e.jsx(u,{style:{transform:"rotate(270deg)"}}),p=n.useRef(null),h=n.useRef(null);return n.useEffect(()=>{j&&(o.visible?h?.current?.focus():p?.current?.focus(),b(o.visible))},[p,o.visible]),e.jsxs(k,{"aria-expanded":o.visible,...v,children:[!o.visible&&e.jsx(g,{ref:p,onClick:()=>f(!0),...o,children:e.jsx(q,{children:S})}),e.jsxs(T,{...o,children:[o.visible&&e.jsx(g,{ref:h,onClick:()=>{o.hide(),f(!0)},children:e.jsx(u,{style:{transform:"rotate(90deg)"}})}),y]})]})};d.propTypes={sidebarIcon:c.node,visible:c.bool,onChange:c.func,children:c.node};d.__docgenInfo={description:"",methods:[],displayName:"Sidebar",props:{sidebarIcon:{defaultValue:{value:"<Arrow style={{ transform: 'rotate(270deg)' }} />",computed:!1},description:"The icon you want to display to open the sidebar. Arrow by default",type:{name:"node"},required:!1},visible:{defaultValue:{value:"true",computed:!1},description:"The initial state of the sidebar (open or closed)",type:{name:"bool"},required:!1},onChange:{defaultValue:{value:"() => {}",computed:!1},description:"Action to trigger on toggle change",type:{name:"func"},required:!1},children:{description:"Content of the sidebar",type:{name:"node"},required:!1}}};const F={title:"Components/Sidebar",component:d,parameters:{layout:"fullscreen"}},m=r=>e.jsx(l,{height:"100vh",children:e.jsx(d,{...r})}),s=m.bind({});s.args={children:e.jsx(l,{py:32,px:24,children:"I’m a sidebar"})};const t=m.bind({});t.args={sidebarIcon:e.jsx(C,{}),children:e.jsx(l,{py:32,px:24,children:"I’m a sidebar"})};const a=m.bind({});a.args={visible:!1,children:e.jsx(l,{py:32,px:24,children:"I’m a sidebar"})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => <Box height="100vh">
    <Sidebar {...args} />
  </Box>`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => <Box height="100vh">
    <Sidebar {...args} />
  </Box>`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => <Box height="100vh">
    <Sidebar {...args} />
  </Box>`,...a.parameters?.docs?.source}}};const G=["Default","WithIcon","DefaultClosed"];export{s as Default,a as DefaultClosed,t as WithIcon,G as __namedExportsOrder,F as default};
