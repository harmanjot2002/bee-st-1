const express=require('express');
const mongoose=require('mongoose');
const Post=require('./Models/PostSchema');

const app=express();
const PORT=process.env.PORT | 3000

app.use(express.json());

const uri = "mongodb+srv://Harman:Harman@cluster0.7zlcmek.mongodb.net/st";
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log(`Database connected`))
.catch(()=>console.log(`Ooh`))


app.post('/api/posts', async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.get('/api/posts', async (req, res) => {
    try {
      const allPosts = await Post.find();
      res.json(allPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.get('/api/posts/:postId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.put('/api/posts/:postId', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.delete('/api/posts/:postId', async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post('/api/posts/:postId/comments', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.push(req.body);
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.get('/api/posts/:postId/comments', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const comment = post.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      comment.set(req.body);
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.id(req.params.commentId).remove();
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})