<style lang='scss'>
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
      <div class="editor-editarea">
        <textarea class="editorinput" name="" id="" cols="30" rows="10" v-model="input"></textarea>
        <div class="html" v-html="input | markRender"></div>
      </div>
  </div>
</template>
<script>
import marked from 'marked'
let renderer = new marked.Renderer()
let styleList = {
  title: {
    h1: 'text-align:center;font-size:20px;margin-top:50px;margin-bottom:20px;',
    h2: 'text-align:center;font-size:18px;margin-top:50px;margin-bottom:20px',
    h3: 'text-align:center;font-size:16px;margin-top:40px;margin-bottom:10px',
    h4: 'text-align:center;font-size:14px;margin-top:50px;'
  },
  paragraph: 'font-size:15px;color:#777;line-height:1.75;text-align:justify;margin-top:30px;margin-bottom:30px',
  image: {
    wrap: 'padding:0.05rem;border-width:1px;border-style:solid;border-color:#ccc;',
    img: 'width:100%;height:auto;vertical-align:top',
    txt: 'color:#ccc;font-size:.7rem;text-align:center;line-height:1.5;margin:1px 0;display:block'
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

renderer.heading = (text, level) => {
  let style = ''
  switch (level) {
    case 1:
      style = styleList.title.h1
      break
    case 2:
      style = styleList.title.h2
      break
    case 3:
      style = styleList.title.h3
      break
    case 4:
      style = styleList.title.h4
      break
    default:
      style = styleList.title.h2
      break
  }

  return '<h' + level + ' style="' + style + '">' + text + '</h' + level + '>'
}

renderer.paragraph = (text) => {
  let style = styleList.paragraph
  return '<p style=' + style + '>' + text + '</p>'
}

renderer.image = (url, title, text) => {
  let { wrap, img, txt } = styleList.image
  let textHtml = ''
  text ? textHtml = '<span style=' + txt + '>' + text + '</span>' : textHtml = ''
  return '<p style=' + wrap + '><img src=' + url + ' style=' + img + '>' + textHtml + '</p>'
}

renderer.blockquote = (text) => {
  let { wrap, quote, txt } = styleList.blockquote
  return '<blockquote style=' + wrap + '><strong style=' + quote + '>“</strong><em style=' + txt + '>' + text + '</em></blockqoute>'
}

renderer.list = (body, ordered) => {
  let style = styleList.list.wrap
  ordered ? console.log(1) : console.log(2)
  return '<p style=' + style + '>' + body + '</p>'
}
renderer.listitem = (list) => {
  let { wrap, point, txt } = styleList.list.item
  console.log(this)
  return '<span style=' + wrap + '><span style=' + point + '>・</span><span style=' + txt + '>' + list + '</span>'
}

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
    $('.html').style.height = $('.editorinput').style.height = document.body.clientHeight + 'px'
  }
}

</script>