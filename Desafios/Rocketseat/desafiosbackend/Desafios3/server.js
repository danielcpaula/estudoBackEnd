const express = require('express')
const nunjucks = require('nunjucks')
const artigos = require("./data")

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res) {
  return res.render("index")
})

server.get("/sobre", function(req, res){
  return res.render("sobre")
})

server.get("/conteudos", function(req, res){
  return res.render("conteudos", {items: artigos})
})

server.get("/courses", function(req, res){
  const id = req.query.id

  const artigo = artigos.find(function(artigo){
    return artigo.id == id
  })

  if (!artigo) {
    return res.send("Video not Found")
  }

  return res.render ("courses", {item: artigo})
})


//ERRO 404
server.use(function(req, res){
  res.status(404).render("not-found")
})

server.listen(5000, function(){
  console.log("Server is running")
})