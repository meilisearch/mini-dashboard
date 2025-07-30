import{j as a}from"./jsx-runtime-BO8uF4Og.js";import{r as p}from"./index-D4H_InIO.js";import{C as g}from"./index-Ba0DhWvd.js";import{P as c}from"./index-LDOOE3Uh.js";import{q as d}from"./styled-components.browser.esm-znzuwYFE.js";import{I as f}from"./IconButton-D_x5RvMH.js";import{T as h}from"./Typography-CUKj5wrb.js";import{b as y}from"./Speed-Cmh9zlf_.js";import{a as D,_ as m,b as u,c as b}from"./Clickable-BApbfUri.js";import{b as v}from"./Disclosure-BpSKb0FX.js";import"./index-CeB5NTF0.js";import{D as k,P as j,a as C,b as E,u as P,c as B}from"./DialogDisclosure-GYWNvtoA.js";import"./index.esm-CT27t1GU.js";import"./theme-DqhZBUSA.js";import"./Button-D-sgiqtp.js";import"./index-DJb3ZqvP.js";import"./removeIndexFromArray-Op0ZOHre.js";var _=D({name:"DialogBackdrop",compose:v,keys:k,useOptions:function(o){var t=o.modal,r=t===void 0?!0:t,i=m(o,["modal"]);return u({modal:r},i)},useProps:function(o,t){var r=t.wrapElement,i=m(t,["wrapElement"]),x=p.useCallback(function(l){return o.modal&&(l=p.createElement(j,null,p.createElement(C.Provider,{value:o.baseId},l))),r?r(l):l},[o.modal,r]);return u({id:void 0,"data-dialog-ref":o.baseId,wrapElement:x},i)}}),w=b({as:"div",memo:!0,useHook:_});const I=d(w)`
  &[data-leave] {
    opacity: 0;
  }
  &[data-enter] {
    opacity: 1;
  }
  transition: opacity 250ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 997;
  background-color: ${e=>g(e.theme.colors.gray[3]).alpha(.6)};
`,M=d(E)`
  &[data-leave] {
    opacity: 0;
  }
  &[data-enter] {
    opacity: 1;
  }
  transition: opacity 250ms ease-in-out;
  max-width: 992px;
  position: relative;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 48px));
  border-radius: 0.25rem;
  outline: 0px;
  padding: 24px 32px 24px 40px;
  box-shadow: 0px 0px 30px ${e=>g(e.theme.colors.gray[0]).alpha(.15)};
  background-color: ${e=>e.theme.colors.gray[11]};
  z-index: 999;
`,S=d(f)`
  position: absolute;
  top: 16px;
  right: 16px;
  &:hover {
    pointer-events: initial;
  }
`,n=({title:e,dialog:o,children:t,ariaLabel:r="Welcome",...i})=>a.jsx(I,{...o,children:a.jsxs(M,{...o,"aria-label":r,preventBodyScroll:!0,...i,children:[e&&a.jsx(h,{variant:"typo1",mb:4,children:e}),t,a.jsx(S,{color:"gray.7",onClick:()=>o.hide(),"aria-label":"close",children:a.jsx(y,{style:{width:15}})})]})});n.propTypes={title:c.string,children:c.node};n.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{ariaLabel:{defaultValue:{value:"'Welcome'",computed:!1},required:!1},title:{description:"Title of the Modal",type:{name:"string"},required:!1},children:{description:"Modal contents",type:{name:"node"},required:!1}}};const U={title:"Components/Modal",component:n},T=e=>{const o=P({animated:!0});return a.jsxs(a.Fragment,{children:[a.jsx(B,{...o,children:"Click me"}),a.jsx(n,{dialog:o,...e})]})},s=T.bind({});s.args={title:"I’m a title",children:a.jsx("div",{children:"I’m the Modal’s content"})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const dialog = useDialogState({
    animated: true
  });
  return <>
      <DialogDisclosure {...dialog}>Click me</DialogDisclosure>
      <Modal dialog={dialog} {...args} />
    </>;
}`,...s.parameters?.docs?.source}}};const X=["Default"];export{s as Default,X as __namedExportsOrder,U as default};
