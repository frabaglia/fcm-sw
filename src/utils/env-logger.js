module.exports = function(env) {
    if (env === "dev") {
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+ Running this server with babel-node +")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+        process.env.ENV = dev        +")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("Running code from src")
    } else {
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+    Running this server with node    +")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("+        process.env.ENV = prod       +")
        console.log("+++++++++++++++++++++++++++++++++++++++")
        console.log("Running code from .dist")
    }
}
