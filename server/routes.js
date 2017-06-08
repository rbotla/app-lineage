var router = require('express').Router();
const GraphCtrl = require('./controllers/GraphCtrl');

router.get('/nodes', GraphCtrl.getNodes);
router.post('/nodes', GraphCtrl.addEntities);

module.exports = router;