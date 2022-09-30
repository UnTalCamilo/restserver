const {Router} = require('express');
const {check} = require('express-validator');
const {userGet, userDelete, userPut, userPost} = require('../controllers/user')
const {isValidRole} = require('../helpers/db_validator')

const router = Router();


router.get('/', userGet);
//router.post('/', userPost );
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('pwd', 'Password must be at least 6 characters').isLength({min: 6}),
    check('email', 'Email is not valid').isEmail(),

    // check('role', 'Role is not valid').isIn(['ADMIN', 'USER']),
    check('role').custom(isValidRole)
], userPost);

router.put('/', userPut);
router.delete('/', userDelete);

module.exports = router;