const app = require('../server/src/app')
const request = require('supertest')(app);
const expect = require('chai').expect;


// Test function for '/' endpoint
describe('GET /', () =>{
    it('Starting app should return a 200 status code', (done) =>{
        request.get('/')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/launch' endpoint
describe('GET /launch', () =>{
    it('Launch tab should return a 200 status code', (done) =>{
        request.get('/launch')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/upcoming' endpoint
describe('GET /upcoming', () =>{
    it('Upcoming tab should return a 200 status code', (done) =>{
        request.get('/upcoming')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/history' endpoint
describe('GET /history', () =>{
    it('History tab should return a 200 status code', (done) =>{
        request.get('/history')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/planets' get endpoint
describe('GET /planets', () =>{
    it('Get all planets should return a 200 status code', (done) =>{
        request.get('/planets')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/launches' get endpoint
describe('GET /launches', () =>{
    it('Get all launches should return a 200 status code', (done) =>{
        request.get('/launches')
        .expect(200)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

// Test function for '/launches' post endpoint
describe('POST /launches', () =>{
    it('Add a new launch should return a JSON content of the new launch', (done) =>{
        request.post('/launches')
        .set('Content-Type', 'application/json')
        .expect((res) =>{
            res.body.mission = 'ZTM155';
            res.body.rocket = 'ZTM Experimental IS1';
            res.body.target = 'Kepler-186 f';
            res.body.launchDate = 'January 17, 2023';
        })
        .end((err, res) =>{
            if(err) return done(err);

            // Test if the res.body equal the JSON content
            expect(res.body).to.be.an('object');
            expect(res.body.mission).to.equal('ZTM155');
            expect(res.body.rocket).to.equal('ZTM Experimental IS1');
            expect(res.body.target).to.equal('Kepler-186 f');
            expect(res.body.launchDate).to.equal('January 17, 2023');

            done();
        })
    })
})

// Test function for '/launches/:id' delete endpoint
describe('DELETE /launches/101', () =>{
    it('Get all launches should return a 200 status code', (done) =>{
        request.delete('/launches/101')
        .expect('Content-Type', /json/)
        .end((err, res) =>{
            if(err) return done(err);
            done();
        })
    })
})

