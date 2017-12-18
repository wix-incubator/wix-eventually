const retry = require('../dist/index.umd')
const {expect} = require('chai')

describe('wix-eventually', function() {
  this.timeout(20000)

  it('should retry 10 times with 1s delay by default and fail', done => {
    const before = Date.now()

    retry(() => { throw new Error('nope') }).catch(e => {
      expect(e.message).to.be.string('Timeout of 10000 ms with: nope')
      expect(Date.now() - before).to.be.gt(9000).and.be.lt(11000)
      done()
    })
  })

  it('should allow to set custom timeout', done => {
    const before = Date.now()

    retry(() => { throw new Error('nope') }, {timeout: 2000}).catch(e => {
      expect(e.message).to.be.string('Timeout of 2000 ms with: nope')
      expect(Date.now() - before).to.be.gt(1500).and.be.lt(2500)
      done()
    })
  })

  it('should pass-through succeeding promise', () => {
    return retry(() => Promise.resolve())
  })

  it('should pass-through succeeding function', () => {
    return retry(() => 'ok')
  })

  it('should eventually succeed', () => {
    let okToProceed = false
    setTimeout(() => okToProceed = true, 2000)
    return retry(() => okToProceed === true ? Promise.resolve() : Promise.reject(new Error('nope')))
  })

  it('should be rejected with underlying error after timeout', done => {
    retry(() => { throw new Error('nope') }, {timeout: 2000}).catch(e => {
      expect(e.message).to.be.string('Timeout of 2000 ms with: nope')
      done()
    })
  })
})
