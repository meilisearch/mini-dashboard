import{j as a}from"./jsx-runtime-BO8uF4Og.js";import{R as x}from"./index-D4H_InIO.js";import{C as t}from"./index-Ba0DhWvd.js";import{q as n,A as o}from"./styled-components.browser.esm-znzuwYFE.js";import{P as r}from"./index-LDOOE3Uh.js";import{s as $,c as y}from"./index.esm-CT27t1GU.js";import{T as w}from"./Typography-CUKj5wrb.js";import{e as k}from"./Speed-Cmh9zlf_.js";import{B as q}from"./Button-D-sgiqtp.js";const i=n(k)`
  margin-left: 6px;
`,s={default:o`
    padding: 0 24px;
    min-width: 128px;
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: ${e=>e.theme.colors.gray[10]};
    box-shadow: 0px 4px 6px ${t("#000").alpha(.04)};
    color: ${e=>e.theme.colors.gray[0]};
    svg {
      color: ${e=>e.theme.colors.main.default};
    }

    &:hover,
    &:focus,
    &:active,
    &:active,
    &[aria-expanded='true'] {
      box-shadow: none;
      border-color: ${e=>e.theme.colors.main.default};
    }
  `,filled:o`
    padding: 0 24px;
    min-width: 128px;
    background-color: ${e=>e.theme.colors.main.default};
    border: 1px solid ${e=>e.theme.colors.main.default};
    color: white;
    svg {
      color: white;
    }

    &:hover,
    &:focus,
    &:active {
      background-color: ${e=>e.theme.colors.main.hover};
    }

    &[aria-disabled='true'] {
      background-color: ${e=>t(e.theme.colors.gray[2]).alpha(.4)};
      border-color: transparent;
    }
  `,bordered:o`
    padding: 0 24px;
    min-width: 128px;
    background-color: transparent;
    border: 2px solid ${e=>e.theme.colors.main.default};
    color: ${e=>e.theme.colors.main.default};
    svg {
      color: ${e=>e.theme.colors.main.default};
    }

    &:hover,
    &:focus,
    &:active {
      border-color: ${e=>e.theme.colors.main.hover};
      color: ${e=>e.theme.colors.main.hover};
    }
  `,link:o`
    border: none;
    height: auto !important;
    background-color: transparent;
    color: ${e=>e.theme.colors.main.default};
    padding: 0 !important;
    span {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    &:hover,
    &:focus,
    &:active {
      color: ${e=>e.theme.colors.main.hover};
    }
  `,grayscale:o`
    padding: 8px;
    background-color: transparent;
    border: none;
    color: ${e=>e.theme.colors.gray[2]};

    svg {
      color: ${e=>e.theme.colors.gray[4]};
    }

    &:hover,
    &:focus,
    &:active {
      background-color: ${e=>e.theme.colors.gray[10]};
    }
  `},l={medium:o`
    height: 48px;
  `,small:o`
    height: 34px;
    span {
      font-size: 14px;
    }
  `},z=n(q)`
  ${e=>e.$variant};
  ${e=>e.$size};
  ${e=>e.$shape};
  ${$};
  ${y};

  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  transition:
    background-color 300ms,
    color 200ms,
    box-shadow 300ms,
    border-color 300ms;

  &:hover {
    cursor: pointer;
  }
  svg {
    transition:
      color 200ms,
      transform 300ms;
    margin-right: 8px;
  }

  &[aria-expanded='true'] {
    ${i} {
      transform: rotate(180deg);
    }
  }
`,d=x.forwardRef(({as:e,variant:c="default",size:m="medium",icon:p,toggable:u=!1,children:f,...h},g)=>{const v=s[c]||s.default,b=l[m]||l.medium;return a.jsxs(z,{as:e,$variant:v,$size:b,ref:g,...h,children:[p,a.jsx(w,{variant:"typo4",children:f}),u&&a.jsx(i,{style:{width:9}})]})});d.propTypes={as:r.string,variant:r.oneOf(["default","filled","bordered","clean","link","grayscale"]),size:r.oneOf(["medium","small"]),icon:r.node,toggable:r.bool,children:r.node};d.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{defaultValue:{value:"'default'",computed:!1},description:"Buttons's variant",type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'filled'",computed:!1},{value:"'bordered'",computed:!1},{value:"'clean'",computed:!1},{value:"'link'",computed:!1},{value:"'grayscale'",computed:!1}]},required:!1},size:{defaultValue:{value:"'medium'",computed:!1},description:"Buttons's size",type:{name:"enum",value:[{value:"'medium'",computed:!1},{value:"'small'",computed:!1}]},required:!1},toggable:{defaultValue:{value:"false",computed:!1},description:"Whether the button is toggable or not",type:{name:"bool"},required:!1},as:{description:`Custom tag if we don't want a "button" to appear in the DOM`,type:{name:"string"},required:!1},icon:{description:"The icon provided to appear on the left",type:{name:"node"},required:!1},children:{description:"Text to be displayed",type:{name:"node"},required:!1}}};export{d as B};
