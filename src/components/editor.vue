<style lang='scss'>
  #control-panel{
    height:100px;
    button{
      width:200px;
      border:1px solid #429B36;
      height:60px;
      float: right;
      margin:20px;
      background: #7FB665;
      color:#fff;
      border-radius: 6px;
      font-size: 20px;
    }
  }
  .editor{
    width: 100%;
    height:100%;
    .editor-editarea{
      display: -webkit-box;
      textarea.editorinput{
        width:50%;
        display: block;
        border:1px solid #ccc;
        -webkit-box-flex:1;
        padding:20px;
      }
      .html{
        width:50%;
        border:1px solid #000;
        -webkit-box-flex:1;
        padding:0 20px;
        overflow-y: scroll;
      }
    }
    
    .editor-header{
      height:160px;
      display: block;
    }
  }
</style>
<template>
  <div class="editor">
      <header id="control-panel">
        <button class="btn" data-clipboard-target="#content">复制内容</button>
      </header>
      <div class="editor-editarea">
        <textarea class="editorinput" name="" id="" cols="30" rows="10" v-model="input"></textarea>
        <div id="content" class="html" id="html" v-html="input | markdownit"></div>
      </div>
  </div>
</template>
<script>
import marked from 'marked'
import MarkdownIt from 'markdown-it'
import Clipboard from 'clipboard'

let renderer = new marked.Renderer()
let styleList = {
  title: {
    h1: 'text-align:center;font-size:22px;margin-top:50px;margin-bottom:20px;color:#333',
    h2: 'text-align:center;font-size:20px;margin-top:50px;margin-bottom:20px;color:#333',
    h3: 'text-align:left;font-size:18px;margin-top:40px;margin-bottom:10px;color:#333',
    h4: 'text-align:left;font-size:16px;margin-top:50px;color:#333'
  },
  paragraph: 'font-size:15px;color:#585858;line-height:1.75;text-align:justify;margin-top:30px;margin-bottom:30px',
  image: {
    wrap: 'padding:0.4rem;border-width:1px;border-style:solid;border-color:#f2f2f2;margin-bottom:20px;background:#fafafa',
    img: 'width:100%;height:auto;vertical-align:top',
    txt: 'color:#777;font-size:.7rem;text-align:center;line-height:1.5;margin:1px 0;display:block'
  },
  blockquote: {
    wrap: 'background:#e7e7e7;color:#666;padding:20px;padding-top:10px;padding-bottom:10px;margin:0;font-size:14px;line-height:1.5;overflow:hidden;margin-bottom:30px',
    quote: 'font-size:50px;height:30px;margin-top:10px;color:#aaa9a9;font-family:Georgia,serif;float:left;margin-right:10px;',
    txt: 'display:block;overflow:hidden;color:#979797;text-align:justify'
  },
  list: {
    wrap: 'text-align:justify;margin-top:30px;margin-bottom:30px;font-size:14px;color:#999;background:#fafafa;padding:10px;padding-left:20px;padding-right:20px;border-width:6px;border-style:solid;border-color:#ececec',
    item: {
      wrap: 'display:block;margin-top:20px;margin-bottom:20px;',
      point: 'display:block;float:left;line-height:1.5;margin-right:10px;',
      txt: 'overflow:hidden;line-height:1.5;display:block'
    }
  }
}

let md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})

let clipboard = new Clipboard('.btn')

clipboard.on('success', (e) => {
  console.log(e)
})

md.renderer.rules.link_open = (tokens, idx) => {
  var title = tokens[idx].title ? (' title="' + md.utils.escapeHtml(md.utils.replaceEntities(tokens[idx].title)) + '"') : ''
  return '<a class="' + md.utils.escapeHtml(tokens[idx].href) + '"' + title + ' target="_blank">'
}

md.renderer.rules.blockquote_open = (tokens, idx) => {
  let { wrap, quote, txt } = styleList.blockquote
  return '<blockquote style=' + wrap + '><strong style=' + quote + '>“</strong><em style=' + txt + '>'
}

md.renderer.rules.blockquote_close = (token, idx) => {
  return '</em></blockquote>'
}

md.renderer.rules.paragraph_open = (token, idx) => {
  let style = styleList.paragraph
  let tag = '<p style=' + style + '>'
  token[idx + 1].children[0].tag === 'img' ? style = styleList.image.wrap : style = styleList.paragraph
  token[idx].level === 2 ? tag = '' : tag = '<p style=' + style + '>'
  return tag
}

md.renderer.rules.image = (tokens, idx, options, env, slf) => {
  let token = tokens[idx]
  let hasText = ''
  let txt = slf.renderInlineAsText(token.children)

  txt ? hasText = '<span style=' + styleList.image.txt + '>' + txt + '</span>' : ''

  token.attrs[token.attrIndex('alt')][1] = txt

  return '<img style=' + styleList.image.img + ' src=' + token.attrGet('src') + '>' + hasText
}

md.renderer.rules.heading_open = (tokens, idx, options, env, slf) => {
  let style = ''
  switch (tokens[idx].tag) {
    case 'h1':
      style = styleList.title.h1
      break
    case 'h2':
      style = styleList.title.h2
      break
    case 'h3':
      style = styleList.title.h3
      break
    case 'h4':
      style = styleList.title.h4
      break
    default:
      style = styleList.title.h2
      break
  }
  return '<' + tokens[idx].tag + ' style=' + style + '>'
}

md.renderer.rules.bullet_list_open = (tokens, idx, options, env, slf) => {
  return '<p style=' + styleList.list.wrap + '>'
}
md.renderer.rules.bullet_list_close = (tokens, idx, options, env, slf) => {
  // console.log(tokens[idx])
  return '</p>'
}
md.renderer.rules.list_item_open = (tokens, idx, options, env, slf) => {
  let { wrap, point, txt } = styleList.list.item
  return '<span style=' + wrap + '><span style=' + point + '>・</span><span style=' + txt + '>'
}
md.renderer.rules.list_item_close = (tokens, idx, options, env, slf) => {
  return '</span></span>'
}

// md.block.ruler.before('paragraph', 'myrule', (state) => {
//   return 'test'
// })
export default {
  data () {
    return {
      input: ''
    }
  },
  filters: {
    marked: marked,
    markRender (val) {
      return marked(val, {
        renderer: renderer
      })
    },
    markdownit (val) {
      // let $ = el => document.getElementById(el)
      // console.log($('html').querySelectorAll('p'))
      return md.render(val)
    }
  },
  methods: {
    setStyle (event) {
      console.log(event.target.attributes[1])
      styleList.title.h1 = event.target.attributes[1].nodeValue
    }
  },
  ready () {
    let $ = el => document.querySelector(el)
    $('.html').style.height = $('.editorinput').style.height = document.body.clientHeight - 100 + 'px'
  }
}

</script>