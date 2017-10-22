const uuid = require('uuid/v4')
const songs = require('../data/songs')

const getAllSongs = (artist) => {
  if(artist) {
    artistSongs = songs.filter(song => song.artist.toLowerCase() === artist )
    return artistSongs
  } else {
    return songs
  }
}

const getOneSong = (id) => {
  return songs.find(song => song.id === id)
}

const createSong = (body) => {
  const title = body.title
  const artist = body.artist

  if(!title || !artist) {
    return { error: { message: "Please include artist and title" }}
  }
  
  const id = uuid()
  const newSong = {
    id,
    title,
    artist
  }

  songs.push(newSong)
  return newSong
}

module.exports = {
  getAllSongs,
  getOneSong, 
  createSong
}