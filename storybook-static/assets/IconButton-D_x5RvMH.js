import{j as c}from"./jsx-runtime-BO8uF4Og.js";import{R as p}from"./index-D4H_InIO.js";import{C as u}from"./index-Ba0DhWvd.js";import{q as f,A as r}from"./styled-components.browser.esm-znzuwYFE.js";import{P as e}from"./index-LDOOE3Uh.js";import{s as m,c as b}from"./index.esm-CT27t1GU.js";import{t as v}from"./theme-DqhZBUSA.js";const t={default:r`
    border: none;
    padding: 4px 6px;
    &:focus {
      svg {
        filter: drop-shadow(
          0px 0px 3px ${o=>u(o.theme.colors[o.color]).alpha(.2)}
        );
      }
    }
  `,bordered:r`
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 50%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 300ms;
    svg {
      transition: color 300ms;
    }
    &:hover,
    &:focus {
      background-color: currentColor;
      svg {
        color: white;
      }
    }
  `},h=f.button`
  ${o=>o.$variant};
  ${m};
  ${b};
  outline: none;
  background-color: transparent;
  cursor: pointer;
  svg {
    display: block;
  }
`,a=p.forwardRef(({color:o,variant:n="default",children:s,...d},i)=>{const l=t[n]||t.default;return c.jsx(h,{color:o||v.colors.main.default,$variant:l,ref:i,...d,children:s})});a.propTypes={color:e.node,variant:e.oneOf(["default","bordered"]),children:e.node};a.__docgenInfo={description:"",methods:[],displayName:"IconButton",props:{variant:{defaultValue:{value:"'default'",computed:!1},description:"variant of the button",type:{name:"enum",value:[{value:"'default'",computed:!1},{value:"'bordered'",computed:!1}]},required:!1},color:{description:"Color of the icon",type:{name:"node"},required:!1},children:{description:"Text to be displayed",type:{name:"node"},required:!1}}};export{a as I};
