const express = require('express')
const router = express.Router()
const ctrl = require('../controller')

router.get('/', ctrl.getAllSongs)
router.get('/:id', ctrl.getOneSong)
router.post('/', ctrl.createSong)

module.exports = router