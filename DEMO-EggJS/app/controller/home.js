const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world'
  }
}

module.exports = HomeController
