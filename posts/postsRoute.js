const express = require('express');
const router = express.Router();
const db = require('../data/db')

router.get('/', (req, res) => {
  db.find().then(posts=>{
    res.status(200).json(posts)
  }).catch(()=>{ res.status(500).json({ error: "The posts information could not be retrieved." }) })
})
router.post('/', (req, res) => {
  req.body.title && req.body.contents ?
    db.insert(req.body).then(idObj => {
      db.findById(idObj.id).then(post=>{res.status(201).json(post)})
    }).catch(() => {res.status(500).json({ error: "There was an error while saving the post to the database" })}):
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
})

router.get('/:id', (req, res)=>{
  db.findById(req.params.id).then(post=>{
    post ? 
      res.status(200).json(post) : 
      res.status(404).json({ message: "The post with the specified ID does not exist." })
  }).catch(()=>{res.status(500).json({ error: "The post information could not be retrieved." })})
})
router.put('/:id', (req, res)=>{
  req.body.title || req.body.contents ?
    db.findById(req.params.id).then(post => {
      post ?
        db.update(req.params.id, req.body).then(()=>{
          db.findById(req.params.id).then(updatedPost => {
            res.status(200).json(updatedPost)
          })
        }):
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }).catch(() => {res.status(500).json({ error: "The post information could not be modified." })}):
    res.status(400).json({ errorMessage: "Please provide title or contents for the post." });
})
router.delete('/:id', (req, res)=>{
  db.findById(req.params.id).then(post=>{
    post ? 
    db.remove(req.params.id).then(()=>{
      res.status(200).json(post)
    }):
    res.status(404).json({ message: "The post with the specified ID does not exist." })
  }).catch(()=>{res.status(500).json({ error: "The post could not be removed" })})
})

module.exports = router;