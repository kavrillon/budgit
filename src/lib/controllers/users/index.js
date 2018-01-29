const User = require('../../models/User')

class UserController {
  findAll (req, res) {
    User.find((err, items) => {
      if(err){
        console.log(err)
      }
      else {
        res.json(items)
      }
    })
  }

  create (req, res) {
    var item = new User(req.body)
    item.save()
    .then(item => {
      res.status(200).json({'item': 'Item added successfully'})
    })
    .catch(err => {
      res.status(400).send("unable to save to models")
    })
  }
}

module.exports = new UserController()
