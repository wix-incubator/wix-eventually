import {expect} from 'chai';
import * as eventually from '..';

describe('wix-eventually types', function () {
    this.timeout(20000);

    it('exports a function', () => {
        expect(eventually).to.be.a('function');
    });

    it('should return a promise', done => {
        eventually(() => true).then(() => done());
    });

    it('should return a promise resolving to function result', done => {
        eventually(() => Promise.resolve('success')).then(result => {
            expect(result).to.be.string('success');
            done();
        });
    });

    it('should return a promise resolving to function success result', done => {
        let retryCount = 0;
        const fn = () => {
            retryCount++;
            if (retryCount === 2) {
                return 'success'
            }
            throw new Error('ups');
        };

        eventually(fn).then(result => {
            expect(result).to.be.string('success');
            done();
        });
    });

    it('does not require options', () => {
        return eventually(() => true);
    });

    it('respects timeout', done => {
        const fn = () => Promise.reject(new Error('woops'));

        eventually(fn, {timeout: 10}).catch(e => {
            expect(e.message).to.be.string('Timeout of 10 ms');
            done();
        });
    });

    it('respects interval', done => {
        let retryCount = 0
        const fn = () => {
            retryCount++;
            throw new Error('ups');
        };

        eventually(fn, {timeout: 100, interval: 10}).catch(() => {
            expect(retryCount).to.be.gt(9).lt(12);
            done();
        });
    });

    describe('with', () => {

        it('respects timeout', done => {
            const fn = () => Promise.reject(new Error('woops'));

            eventually.with({timeout: 10})(fn).catch(e => {
                expect(e.message).to.be.string('Timeout of 10 ms');
                done();
            });
        });

        it('respects interval', done => {
            let retryCount = 0
            const fn = () => {
                retryCount++;
                throw new Error('ups');
            };

            eventually.with({timeout: 100, interval: 10})(fn).catch(() => {
                expect(retryCount).to.be.gt(9).lt(12);
                done();
            });
        });

        describe('return value', () => {
            let eventuallyWith;

            beforeEach(() => {
                eventuallyWith = eventually.with({});
            })

            it('should be a function', () => {
                expect(eventuallyWith).to.be.a('function');
            });

            it('should return a promise', done => {
                eventuallyWith(() => true).then(() => done());
            });

            it('should return a promise resolving to function result', done => {
                eventuallyWith(() => Promise.resolve('message')).then(result => {
                    expect(result).to.be.string('message');
                    done();
                });
            });

            it('should return a promise resolving to function success result', done => {
                let retryCount = 0;
                const fn = () => {
                    retryCount++;
                    if (retryCount === 2) {
                        return 'success'
                    }
                    throw new Error('ups');
                };

                eventuallyWith(fn).then(result => {
                    expect(result).to.be.string('success');
                    done();
                });
            });

            it('override with options with explicit call options', done => {
                const fn = () => Promise.reject(new Error('woops'));

                eventually.with({timeout: 10000})(fn, {timeout: 10}).catch(e => {
                    expect(e.message).to.be.string('Timeout of 10 ms');
                    done();
                });
            });

            it('respects interval', done => {
                let retryCount = 0
                const fn = () => {
                    retryCount++;
                    throw new Error('ups');
                };

                eventually.with({timeout: 10000, interval: 100000})(fn, {timeout: 100, interval: 10}).catch(() => {
                    expect(retryCount).to.be.gt(9).lt(12);
                    done();
                });
            });
        });

        it('should return a function that returns a promise', done => {
            eventually.with({})(() => true).then(() => done());
        });
    });
});

