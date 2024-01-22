const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
//console.log("hi");

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});