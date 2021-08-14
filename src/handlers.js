
let db = require('./data');

const getAllPosts = (req, res) => {
  return res.status(200).send({
    data: db,
    message: 'success'
  });
}

const addPost = (req, res) => {
  const { title, content } = req.body;
  if(!title || !content) {
    return res.status(422).send({message: 'validation error', errors: {
      ...(!title && { title: 'title is required'}),
      ...(!content && { content: 'content is required'})
    }});
  }
  const newPost = {
    id: db.length ? db[db.length -1].id + 1 : 1,
    title,
    content,
  }
  db.push(newPost);

  return res.status(201).send({data: newPost, message: 'post created'});
}

const deletePost = (req, res) => {
  const { postId } = req.params;
  const post = db.find(_post => _post.id === Number(postId));
  if(!post) {
    return res.status(404).send({message: 'Post not found'})
  }

   db = db.filter(p => p.id !== Number(postId));
   return res.status(200).send({ message: 'post deleted'})
}

const updatePost = (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const post = db.find(_post => _post.id === Number(postId));
  if(!post) {
    return res.status(404).send({message: 'Post not found'})
  }
  db  = db.map(p => {
    if(p.id === Number(postId) ) {
      return {
        ...post,
        ...(title && { title }),
        ...(content && { content })
      }
    }
    return p;
  });

  const updatedPost = db.find(__post => __post.id === Number(postId));
  return res.status(200).send({ data: updatedPost, message: 'post updated'});
}

module.exports = {
  getAllPosts,
  deletePost,
  updatePost,
  addPost,
};