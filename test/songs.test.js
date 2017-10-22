const chai = require('chai')
const expect = chai.expect
const app = require('../app')
chai.use(require('chai-http'))

describe('Song API', function() {
  describe('POST /songs', function() {
    it('should create a new song when correct information is supplied', function(done) {
      const newSong = {
        title: "Bad Romance", 
        artist: "Lady Gaga"
      }

      chai.request(app)
        .post('/songs')
        .send(newSong)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.title).to.equal(newSong.title)
          expect(res.body.data.artist).to.equal(newSong.artist)
          expect(res.body.data.id).to.be.ok
          done()
        })
    })
  })

  it('should return an error if incomplete data is provided', function(done) {
    const newSong = {
      title: "One of those days"
    }

    chai.request(app)
      .post('/songs')
      .send(newSong)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        expect(res.body.error).to.be.an('object')
        expect(res.body.error.message).to.be.ok
        done()
      })
  })

  describe('GET /songs', function () {
    it('should return an array of all the songs', function(done) {
      chai.request(app)
        .get('/songs')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.be.an('object')
          const song = res.body.data[0]
          expect(song.title).to.be.ok
          expect(song.artist).to.be.ok
          done()
        })
    })
  })

  describe('GET /songs?artist=:artist', function() {
    it('should return all songs by a given artist', function(done) {
      chai.request(app)
        .get('/songs?artist=drake')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data.length).to.equal(2)
          const song = res.body.data[0]
          expect(song.artist.toLowerCase()).to.equal('drake')
          done()
        })
    })
  })

  describe('GET /songs/:id', function() {
    it('should return the given song if ID is valid', function(done) {
      chai.request(app)
        .get('/songs')
        .end((err, res) => { 
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          const song = res.body.data[0]
          const id = song.id

          chai.request(app)
            .get(`/songs/${id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              const returnedSong = res.body.data
              expect(returnedSong).to.deep.equal(song)
              done()
            })
        })
    })

    it('should return an error if the ID is invalid', function(done) { 
      chai.request(app)
        .get('/songs/123')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})