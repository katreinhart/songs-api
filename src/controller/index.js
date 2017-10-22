const model = require('../model')

getAllSongs = (req, res, next) => {
  const artist = req.query.artist
  if(artist) {
    const songs = model.getAllSongs(artist)
    res.status(200).json({ data: songs})
  } else {
    const songs = model.getAllSongs()
    res.status(200).json({ data: songs })
  }
}

getOneSong = (req, res, next) => {
  const song = model.getOneSong(req.params.id)
  if(!song) {
    next({ status: 404, message: "Not found" })
  } else {
    res.status(200).json({ data: song })
  }
}

createSong = (req, res, next) => {
  const song = model.createSong(req.body) 
  if(song.error) {
    next({ status: 400, message: "There were errors", errors: song.error.errors })
  } else {
    res.status(200).json({ data: song })
  }
}

module.exports = {
  getAllSongs,
  getOneSong, 
  createSong
}