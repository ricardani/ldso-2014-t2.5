var pg = require('pg');

var PostSchema = new pg.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: pg.Schema.Types.ObjectId, ref: 'Comment' }]
});

pg.model('Post', PostSchema);