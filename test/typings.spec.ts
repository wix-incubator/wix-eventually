import {expect} from 'chai';
import * as eventually from '..';

describe('wix-eventually types', () => {
  it('exports a function', () => {
    expect(eventually).to.not.be.undefined;
    expect(eventually).to.be.a('function');
  });

  it('should accepts options', () => {
    eventually(() => true, {
      timeout: 1000,
      interval: 5000
    });
  });
});

