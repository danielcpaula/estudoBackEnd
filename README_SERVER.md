## SERVER v1.0
const express = require('express') -> chama o servidor express
const nunjucks = require('nunjucks') -> chama o engine template nunjunks

const server = express() -> colocando o express em uma variavél
const videos = require("./data")
server.use(express.static('public')) -> informa a onde está sendo usado as pastas estaticas

server.set("view engine", "njk") -> Fala qual a templeta engine que está sendo usada

nunjucks.configure("views", { -> configurações do nunjunks
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res){ 
  const about = {
    avatar_url:"https://avatars2.githubusercontent.com/u/9807253?s=400&u=9aff2422be84217bfe4932cae1f554010a0e8c65&v=4",
    name: "Daniel de Paula",
    role: "Anaslita de T.I - Zeni Motors",
    description: 'Responsavel pela area de T.i do grupo <a href="http://www.zenimotors.com" target="_blank">Zeni Motors</a>',
    links: [
      {name: "GitHub", url: "/"},
      {name: "Twitter", url: "/"},
      {name: "Linkedin", url: "/"}
    ]
  }
  return res.render("about", { about: about})
})

server.get("/portifolio", function(req, res){
  return res.render("portifolio", {items: videos})
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    /*return video.id == id Mesma coisa que o if abaixo*/
    return video.id == id
  })

  if(!video){
    return res.send("Video not Found!")
  }

  return res.render("video", { item: video })
})

server.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

/*server.use(function(req, res) {
  res.status(404).render("not-found");
});*/

server.listen(5000, function(){
  console.log("Server is running")
})

## ##