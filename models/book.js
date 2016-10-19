
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookDetail = new Schema({
  rating: {
    max: Number,
    numRaters: Number,
    average: String,
    min: Number
  },
  subtitle: String,
  author: Array,
  pubdate: String,
  tags: Array,
  origin_title: String,
  image: String,
  binding: String,
  translator: Array,
  catelog: String,
  pages: String,
  images: {
    small: String,
    large: String,
    medium: String
  },
  alt: String,
  id: String,
  publisher: String,
  isbn10: String,
  isbn13: String,
  title: String,
  url: String,
  alt_title: String,
  author_intro: String,
  summary: String,
  series: {
    id: String,
    title: String
  },
  price: String
})

var BookDetail = mongoose.model('BookDetail', bookDetail)

export default {
	BookDetail
}