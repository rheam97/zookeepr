const router= require('express').Router()
const animalRoutes = require('../apiRoutes/animalRoutes')
const keeperRoutes = require('../apiRoutes/zookeeperRoutes')

router.use(animalRoutes)
router.use(keeperRoutes)

module.exports= router