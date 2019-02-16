
class Gp9Util {
    constructor () {
        return Gp9Util.instance || this.createInstance()
    }
    createInstance () {
        let instance = new Instance()
        Gp9Util.instance = instance
        return instance
    }
}

class Instance {
    constructor () {

    }
    formatTime (time) { // 格式化时间 s -> minutes:seconds
        let _time = Math.floor(time)
        let minutes = Math.floor(_time / 60)
        let seconds = _time % 60
        return this.fillZero(minutes) + ':' + this.fillZero(seconds)
    }
    fillZero (num) {
        return num > 9 ? num : '0' + num
    }
}

// export default Gp9Util

// module.exports = Gp9Util

// define(function(){
//     return Gp9Util
// })