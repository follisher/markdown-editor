import MarkdownIt from 'markdown-it'

let md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true
})

const templates = (styleList) => {
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
    if (token[idx + 1].children[0]) {
      token[idx + 1].children[0].tag === 'img' ? style = styleList.image.wrap : style = styleList.paragraph
    }
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
      case 'h5':
        style = styleList.title.h5
        break
      case 'h6':
        style = styleList.title.h6
        break
      default:
        style = styleList.title.h6
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
}

export {md, templates}
