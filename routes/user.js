const {Router} = require('express');
const {userGet, userDelete, userPut, userPost} = require('../controllers/user')

const router = Router();


router.get('/', userGet);
router.post('/', userPost);
router.put('/', userPut);
router.delete('/', userDelete);

module.exports = router;