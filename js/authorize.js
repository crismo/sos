module.exports = function (user, pass) {
    let adminUser = user;
    let adminPassword = pass;

    return function (req, res, next) {
        console.log("Request requiers authorization");

        let authHeader = req.headers['authorization'];

        if (!authHeader) {
            res.status(401).setHeader('WWW-Authenticate', 'Basic realm="Admin Power"').end();
        } else {

            let credentials = authHeader.split(' ')[1];
            let data = new Buffer(credentials, 'base64'); //
            credentials = data.toString();
            console.log(`Auth ${credentials} actual ${adminUser} & ${adminPassword}`);
            credentials = credentials.split(':');

            let username = credentials[0].trim();
            let password = credentials[1].trim();

            if ((username == adminUser) && (password == adminPassword)) { 
                next();    
            } else {
                res.status(403).end();
            }

        }
    }
}