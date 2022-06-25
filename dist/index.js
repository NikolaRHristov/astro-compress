"use strict";import p from"fs";import g from"fast-glob";import*as h from"csso";import*as y from"html-minifier-terser";import{minify as v}from"terser";import d from"sharp";import w from"svgo";const u=async(s,i=2)=>{if(s===0)return"0 Bytes";const e=1024,a=i<0?0:i,t=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],r=Math.floor(Math.log(s)/Math.log(e));return`${parseFloat((s/e**r).toFixed(a))} ${t[r]}`},b=async(s,i={})=>{const e=s.options.input.file.split(".").pop();if(!e)return;const a={avci:"avif",avcs:"avif",avifs:"avif",heic:"heif",heics:"heif",heifs:"heif",jfif:"jpeg",jif:"jpeg",jpe:"jpeg",jpg:"jpeg"},t=typeof a[e]<"u"?a[e]:typeof i[e]<"u"?e:!1;if(["avif","gif","heif","jpeg","png","raw","tiff","webp"].includes(t)&&i[t]!==!1)return await s[t](i[t]).toBuffer()},j=async(s,i=2)=>{for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e)){const a=s[e];if(!a)continue;switch(e){case"css":await l(`${s.path}**/*.css`,i,e,t=>h.minify(t,a).css);break;case"html":await l(`${s.path}**/*.html`,i,e,async t=>await y.minify(t,a));break;case"js":await l(`${s.path}**/*.{js,mjs,cjs}`,i,e,async t=>(await v(t,a)).code);break;case"img":await l(`${s.path}**/*.{avci,avcs,avif,avifs,gif,heic,heics,heif,heifs,jfif,jif,jpe,jpeg,jpg,png,raw,tiff,webp}`,i,e,async t=>await b(t,a),async t=>await d(t));break;case"svg":await l(`${s.path}**/*.svg`,i,e,async t=>w.optimize(t,a).data);break;default:break}}},l=async(s,i=2,e="",a=async r=>r,t=async r=>await p.promises.readFile(r,"utf-8"))=>{let r={files:await g(s),sizebefore:0},f={files:0,total:0};for(;r.files.length>0;){const o=r.files.shift();if(o)try{const n=(await p.promises.stat(o)).size;r.sizebefore+=n;const c=await a(await t(o));if(!c)continue;if(n>Buffer.byteLength(c)){await p.promises.writeFile(o,c,"utf-8");const m=(await p.promises.stat(o)).size;f.files++,f.total+=n-m,i>1&&console.info("\x1B[32mCompressed "+o.replace(/^.*[\\\/]/,"")+" for "+await u(n-m)+" ("+((n-m)/n*100).toFixed(2)+"% reduction).\x1B[39m")}}catch{console.log("Error: Cannot compress file "+o+"!")}}i>0&&console.info("\x1B[32mSuccessfully compressed a total of "+f.files+" "+e.toUpperCase()+" "+(f.files===1?"file":"files")+" for "+await u(f.total)+".\x1B[39m")};function A(s={}){const e=Object.assign({path:"./dist/",css:{clone:!1,comments:!1,debug:!1,forceMediaMerge:!0,restructure:!0,sourceMap:!1},html:{caseSensitive:!0,collapseBooleanAttributes:!0,collapseInlineTagWhitespace:!1,collapseWhitespace:!0,conservativeCollapse:!1,continueOnParseError:!1,customAttrAssign:[],customAttrCollapse:"",customAttrSurround:[],customEventAttributes:[/^on[a-z]{3,}$/],decodeEntities:!1,html5:!0,ignoreCustomComments:[],ignoreCustomFragments:[],includeAutoGeneratedTags:!0,keepClosingSlash:!0,maxLineLength:null,minifyCSS:!0,minifyJS:!0,minifyURLs:!1,preserveLineBreaks:!1,preventAttributesEscaping:!1,processConditionalComments:!0,processScripts:["module"],quoteCharacter:"",removeAttributeQuotes:!0,removeComments:!0,removeEmptyAttributes:!0,removeEmptyElements:!1,removeOptionalTags:!1,removeRedundantAttributes:!0,removeScriptTypeAttributes:!0,removeStyleLinkTypeAttributes:!0,removeTagWhitespace:!0,sortAttributes:!0,sortClassName:!0,trimCustomFragments:!1,useShortDoctype:!1},js:{ecma:5,enclose:!1,keep_classnames:!1,keep_fnames:!1,ie8:!1,module:!1,safari10:!1,toplevel:!1},img:{avif:{chromaSubsampling:"4:4:4",effort:9},gif:{effort:10},heif:{chromaSubsampling:"4:4:4"},jpeg:{chromaSubsampling:"4:4:4",mozjpeg:!0,trellisQuantisation:!0,overshootDeringing:!0,optimiseScans:!0},png:{compressionLevel:9,palette:!0},raw:{},tiff:{compression:"lzw"},webp:{effort:6}},svg:{multipass:!0,js2svg:{indent:0,pretty:!1},plugins:["preset-default"]},logger:2},s);return{name:"astro-compress",hooks:{"astro:config:done":async a=>{e.path=e.path?e.path:a.config.outDir.toString()},"astro:build:done":async()=>{await j(e,e.logger)}}}}export{A as default};
