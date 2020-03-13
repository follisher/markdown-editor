<template>
  <div class="editor">
      <header id="control-panel">
        <div class="change-template-list">
          <span 
            v-for="item in template" 
            :key="item.status" 
            class="change-template" 
            :class="{'current': item.status}" 
            @click="changeStyle(item)">{{item.name}}</span>
        </div>
        <button class="btn" data-clipboard-target="#content">复制内容</button>
      </header>
      <div class="editor-editarea">
        <textarea class="editorinput" name="" id="" cols="30" rows="10" v-model="input" placeholder="请在这里输入或粘贴 Markdown 格式的文稿"></textarea>
        <div id="content" class="html">
          <div id="html">
            <section class="ys-editor-style-head">此篇大概阅读 15 分钟</section>
            <section class="ys-editor-style-content" style="max-width:100%;overflow:hidden" v-html="input | markdownit"></section>
          </div>
        </div>
      </div>
      <div class="footer">
        Copyright Timeline.design <a href="http://beian.miit.gov.cn/" target="_blank">蒙ICP备19000333号-1</a> 
      </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import template from '../template/template'
import { md, templates } from '../libs/md'

export default {
  data () {
    return {
      input: '',
      template: {
        default: {
          name: template.default.name,
          status: true,
          style: template.default
        },
        humorous: {
          name: template.humorous.name,
          status: false,
          style: template.humorous
        },
        art: {
          name: template.art.name,
          status: false,
          style: template.art
        },
        serious: {
          name: template.serious.name,
          status: false,
          style: template.serious
        }
      }
    }
  },
  filters: {
    markdownit (val) {
      return md.render(val)
    }
  },
  methods: {
    changeStyle (item) {
      for (let i in this.template) {
        this.template[i].status = false
      }
      templates(item.style)
      item.status = true
    }
  },
  ready () {
    let $ = el => document.querySelector(el)
    templates(this.template.default.style)
    $('.html').style.height = $('.editorinput').style.height = document.body.clientHeight - 100 + 'px'
    let clipboard = new Clipboard('.btn')
    clipboard.on('success', e => {
      console.log('复制成功')
    })
  }
}
</script>
<style lang='scss'>
body {
  margin: 0;
  padding: 0;
}
  #control-panel{
    height:100px;
    background:#4e668a;
    display: -webkit-box;
    button{
      width:200px;
      border:none;
      height:60px;
      margin:20px;
      background: #142d48;
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
        border:none;
        -webkit-box-flex:1;
        padding:20px;
      }
      .html{
        width:50%;
        border-left:1px solid #000;
        -webkit-box-flex:1;
        padding:0 20px;
        overflow-y: scroll;
      }
    }
    
    .editor-header{
      height:160px;
      display: block;
    }
    .change-template-list{
      -webkit-box-flex:1;
      display: -webkit-box;
      -webkit-box-align:center;
      padding:0 10px;
    }
    .change-template{
      width:60px;
      height:60px;
      background:none;
      color:#142d48;
      border:1px solid #142d48;
      display: block;
      box-sizing: border-box;
      margin:0 10px;
      cursor: pointer;
      padding:7px;
      line-height: 1.2;
      -webkit-box-align:center;
      display: -webkit-box;
      &.current{
        background: #142d48;
        color:#4e668a;
        border:1px solid rgba(255,255,255,0);
        box-shadow:inset 0 0 5px rgba(0,0,0,.5);
        border-bottom:1px solid rgba(255,255,255,.4);
      }
    }
  }
  .ys-editor-style-head {
    height: 0;
    line-height: 0;
    overflow: hidden;
    display: block;
    margin-top: 0;
  }
  .ys-editor-style-content {
    margin-top: 0;
  }
  .ys-editor-style-content section:first,
  .ys-editor-style-content h2:first {
    margin-top: 0;
  }
  .footer {
    height: 60px;
    line-height: 60px;
    background: #4e668a;
    text-align: center;
    color: #142d48;
    a {
      color: #142d48;
      text-decoration: underline;
    }
  }
</style>