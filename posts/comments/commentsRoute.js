const express = require('express');
const router = express.Router();
const db = require('../../data/db')

router.get('/:id/comments/', (req, res)=>{
  db.findById(req.params.id).then(post=>{
    post ? 
      db.findPostComments(req.params.id).then(comments=>{
        res.status(200).json(comments)
      }).catch(()=>{res.status(500).json({ error: "The comments information could not be retrieved." })}):
      res.status(404).json({ message: "The post with the specified ID does not exist." })
  }).catch(()=>{res.status(500).json({ error: "The comments information could not be retrieved." })})
})
router.post('/:id/comments/', (req, res)=>{
  db.findById(req.params.id).then(post=>{
    post ? 
      db.insertComment(req.body).then(commentIdObj=>{
        db.findCommentById(commentIdObj.id).then(comment=>{
          res.status(201).json(comment)
        })
      }).catch(()=>{res.send(500).json({ error: "There was an error while saving the comment to the database" })}):
      res.status(404).json({ message: "The post with the specified ID does not exist." })
  }).catch(()=>{res.send(500).json({ error: "There was an error while saving the comment to the database" })})
  
})

module.exports = router;