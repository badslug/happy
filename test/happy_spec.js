import expect from 'expect.js'
import {brute, happy, search} from '../static/happy'

let matches = new Set([1, 7, 10, 13, 19, 23])

describe('happy number', function() {
    describe('brute tester', function() {
        it('should find happy number', function() {
            for (let i = 0; i < 24; i++) {
                if(matches.has(i)) {
                    expect(brute(i).happy).to.be.ok()
                } else {
                    expect(brute(i).happy).to.not.be.ok()
                }
            }
        })
    })

    describe('fast tester', function() {
        it('should find happy number', function() {
            for (let i = 0; i < 24; i++) {
                if(matches.has(i)) {
                    expect(happy(i).happy).to.be.ok()
                } else {
                    expect(happy(i).happy).to.not.be.ok()
                }
            }
        })
    })

    describe('search', function() {
        it('should search', function(done) {
            expect(search(1, 5, brute).happy).to.eql([7, 10, 13, 19, 23])
            done()
        })
    })
})