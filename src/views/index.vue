<template>
  <div id='index-vue'>
    <p>{{title}}</p>
    <ul class='book-list'>
      <li is='single-book' v-for='(item, idx) in templateList' :key="idx" :item='item'></li>
    </ul>
  </div>
</template>

<script>
  import hello from '../components/Hello'
  import singleBook from '../components/singleBook'
  export default {
    data () {
      return {
        title: 'bookshelf',
        templateList: [],
        bookList: [{'rating': {'max': 10, 'numRaters': 1583, 'average': '8.7', 'min': 0}, 'subtitle': '', 'author': ['[哥伦比亚] 加西亚·马尔克斯'], 'pubdate': '2015-11-1', 'tags': [{'count': 763, 'name': '加西亚·马尔克斯', 'title': '加西亚·马尔克斯'}, {'count': 341, 'name': '魔幻现实主义', 'title': '魔幻现实主义'}, {'count': 336, 'name': '拉美文学', 'title': '拉美文学'}, {'count': 315, 'name': '小说', 'title': '小说'}, {'count': 267, 'name': '马尔克斯', 'title': '马尔克斯'}, {'count': 239, 'name': '外国文学', 'title': '外国文学'}, {'count': 210, 'name': '短篇小说集', 'title': '短篇小说集'}, {'count': 152, 'name': '哥伦比亚', 'title': '哥伦比亚'}], 'origin_title': 'La increíble y triste historia de la cándida Eréndira y de su abuela desalmada', 'image': 'https://img3.doubanio.com\/mpic\/s28322776.jpg', 'binding': '精装', 'translator': ['陶玉平'], 'catalog': '巨翅老人\n逝去时光的海洋\n世上最美的溺水者\n超越爱情的永恒之死\n幽灵船的最后一次航行\n出售奇迹的好人布拉卡曼\n纯真的埃伦蒂拉和她残忍的祖母令人难以置信的悲惨故事', 'pages': '187', 'images': {'small': 'https://img3.doubanio.com\/spic\/s28322776.jpg', 'large': 'https://img3.doubanio.com\/lpic\/s28322776.jpg', 'medium': 'https://img3.doubanio.com\/mpic\/s28322776.jpg'}, 'alt': 'https:\/\/book.douban.com\/subject\/26628811\/', 'id': '26628811', 'publisher': '南海出版公司', 'isbn10': '754428090X', 'isbn13': '9787544280907', 'title': '世上最美的溺水者', 'url': 'https:\/\/api.douban.com\/v2\/book\/26628811', 'alt_title': 'La increíble y triste historia de la cándida Eréndira y de su abuela desalmada', 'author_intro': '加西亚•马尔克斯\n1927年出生于哥伦比亚马格达莱纳海滨小镇阿拉卡塔卡。童年与外祖父母一起生活。1936年随父母迁居苏克雷。1947年考入波哥大国立大学。1948年因内战辍学，进入报界。五十年代开始出版文学作品。六十年代初移居墨西哥。1967年《百年孤独》问世。1972年出版《世上最美的溺水者》。1982年获诺贝尔文学奖。2014年4月17日于墨西哥病逝。', 'summary': '那个尴尬的傻子死了，人们这才发现他美得动人心魄。\n马尔克斯短篇小说集\n收录《巨翅老人》《世上最美的溺水者》《令人难以置信的悲惨故事》等名篇，入选高中语文教材\n欢迎来到马尔克斯的暗黑童话世界！在这里：\n死去的人会变回年轻时的模样，乘着洋流漂过全世界，带着所有经过的地方的鲜花和水草。\n大雨下得太久，你一觉醒来可能会看见天使掉在你家院子的烂泥里。\n触礁沉没的巨轮会变成幽灵船，一遍遍重复不祥的命运。但若碰上执拗聪明的小男孩，也能从阴间驶进阳世。\n魔法师会为死去的仇人造一座最坚固雄伟的陵墓，然后让他在棺材里一次又一次复活。\n残忍的祖母会押着孙女当妓女，陷入爱情的男孩能听到千里之外情人绝望的呼唤，渴望自由的女孩什么都可以抛弃。', 'series': {'id': '10489', 'title': '新经典文库:加西亚·马尔克斯作品'}, 'price': '35.00元'}]
      }
    },
    components: {
      hello,
      singleBook
    },
    ready () {
      // this.templateList.push()
    },
    methods: {
    }
  }
</script>

<style>
  p{
    color:red;
  }
</style>