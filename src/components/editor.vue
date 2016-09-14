<style>
  .editor{
    width: 100%;
    height:100%;
    display: -webkit-box;
  }
  .editor textarea.editorinput{
    width:50%;
    display: block;
    border:1px solid #ccc;
    -webkit-box-flex:1;
  }
  .editor .html{
    width:50%;
    border:1px solid #000;
    -webkit-box-flex:1;
    padding:0 20px;
    overflow-y: scroll;
  }
</style>
<template>
  <div class="editor">
      <textarea class="editorinput" name="" id="" cols="30" rows="10" v-model="input"></textarea>
      <div class="html" v-html="input | markRender"></div>
  </div>
</template>
<script>
import marked from 'marked'
let renderer = new marked.Renderer()

renderer.heading = (text, level) => {
  let style = ''
  switch (level) {
    case '3':
      style = 'text-align:center;font-size:16px;margin-top:40px;margin-bottom:15px'
      break
    default:
      style = 'text-align:center;font-size:18px;margin-top:50px;'
      break
  }
  return '<h' + level + ' style="' + style + '">' + text + '</h' + level + '>'
}

renderer.paragraph = (text) => {
  let style = 'font-size:15px;color:#777;line-height:1.75;text-align:justify;margin-top:30px;margin-bottom:30px'
  return '<p style=' + style + '>' + text + '</p>'
}

renderer.image = (url, title, text) => {
  let { style, imgStyle, textStyle } = {
    style: 'padding:0.05rem;border-width:1px;border-style:solid;border-color:#ccc;',
    imgStyle: 'width:100%;height:auto;vertical-align:top',
    textStyle: 'color:#ccc;font-size:.7rem;text-align:center;line-height:1.5;margin:1px 0;display:block'
  }
  let textHtml = ''
  text ? textHtml = '<span style=' + textStyle + '>' + text + '</span>' : textHtml = ''
  return '<p style=' + style + '><img src=' + url + ' style=' + imgStyle + '>' + textHtml + '</p>'
}

renderer.blockquote = (text) => {
  let { style, quoteStyle, textStyle } = {
    style: 'background:#e7e7e7;color:#666;padding:20px;padding-top:10px;padding-bottom:10px;margin:0;font-size:14px;line-height:1.5;overflow:hidden;margin-bottom:30px',
    quoteStyle: 'font-size:50px;height:30px;margin-top:10px;color:#aaa9a9;font-family:Georgia,serif;float:left;margin-right:10px;',
    textStyle: 'display:block;overflow:hidden;color:#979797;text-align:justify'
  }
  return '<blockquote style=' + style + '><strong style=' + quoteStyle + '>“</strong><em style=' + textStyle + '>' + text + '</em></blockqoute>'
}

renderer.list = (body, ordered) => {
  let style = 'text-align:justify;margin-top:30px;margin-bottom:30px;font-size:14px;color:#999;background:#fafafa;padding:10px;padding-left:20px;padding-right:20px;border-width:6px;border-style:solid;border-color:#ececec'
  ordered ? console.log(1) : console.log(2)
  return '<p style=' + style + '>' + body + '</p>'
}
renderer.listitem = (list) => {
  let { style, pointStyle, listStyle } = {
    style: 'display:block;margin-top:20px;margin-bottom:20px;',
    pointStyle: 'display:block;float:left;line-height:1.5;margin-right:10px;',
    listStyle: 'overflow:hidden;line-height:1.5;display:block'
  }
  console.log(this)
  return '<span style=' + style + '><span style=' + pointStyle + '>・</span><span style=' + listStyle + '>' + list + '</span>'
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

  },
  ready () {
    let $ = el => document.querySelector(el)
    $('.html').style.height = $('.editorinput').style.height = document.body.clientHeight + 'px'
    console.log(document.body.clientHeight)
  }
}

</script>