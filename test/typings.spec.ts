import {expect} from 'chai';
import * as eventually from '..';

describe('wix-eventually types', () => {
  it('exports a function', () => {
    expect(eventually).to.be.a('function');
  });

  it('should return a promise', () => {
    expect(eventually(() => true)).to.be.a('promise');
  });

  it('does not require options', () => {
    eventually(() => true);
  });

  it('accepts options', () => {
    eventually(() => true, {
      timeout: 1000,
      interval: 5000
    });
  });

  it('accepts partial options', () => {
    eventually(() => true, {
      timeout: 1000
    });

    eventually(() => true, {
      interval: 5000
    });
  });

  describe('with', () => {
    it('should be a function', () => {
      expect(eventually.with).to.be.a('function');
    });

    it('should require options', () => {
      eventually.with({
        timeout: 1000,
        interval: 5000
      });
    });

    it('should support partial options', () => {
      eventually.with({});

      eventually.with({
        timeout: 1000
      });

      eventually.with({
        interval: 5000
      });
    });

    describe('return value', () => {
      let eventuallyWith;

      beforeEach(() => {
        eventuallyWith = eventually.with({});
      })

      it('shoule be a function', () => {
        expect(eventuallyWith).to.be.a('function');
      });

      it('should return a promise', () => {
        expect(eventuallyWith(() => true)).to.be.a('promise');
      });

      it('does not require options', () => {
        eventuallyWith(() => true);
      });

      it('accepts options', () => {
        eventuallyWith(() => true, {
          timeout: 1000,
          interval: 5000
        });
      });

      it('accepts partial options', () => {
        eventuallyWith(() => true, {
          timeout: 1000
        });

        eventuallyWith(() => true, {
          interval: 5000
        });
      });
    });

    it('should return a function that returns a promise', () => {
      expect(eventually.with({})).to.be.a('function');
      expect(eventually.with({})(() => true)).to.be.a('promise');
    });
  });
});

