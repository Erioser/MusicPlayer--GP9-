
(function () {


// 因为类实例化出来的实例如果保持在一个全局变量中的时候，虽然保证了每一处的使用，但是很可能会因为一些疏忽导致变量重写等问题
// 所以我们可以在每次想使用这个实例的时候都去new，保证每次new出来的都是同一个实例
// 只适合于只需要一个实例的场景，这种设计模式叫做单例模式

// 最终的单例模式实现后的类
class Player {
    constructor () {
        // 如果Player类已经有实例了，就返回实例，否则创建实例并返回
        return Player.instance || this.createInstance(arguments)
    }
    createInstance () { // 在没有实例的情况下创建实例的方法
        let instance = new PlayerInstance(arguments) // 创建实例
        Player.instance = instance // 将实例挂载到Player类上作为唯一实例
        return Player.instance
    }
}

// 音乐数据类
class Music {
    constructor () {
        this.songList = [
            { id: 1, name: '丑八怪', singer: '薛之谦', src: './songs/丑八怪 - 薛之谦.mp3', imageUrl: './images/songs/choubaguai.jpg' },
            { id: 2, name: '演员', singer: '薛之谦', src: './songs/演员 - 薛之谦.mp3', imageUrl: './images/songs/yanyuan.jpg' },
            { id: 3, name: '绅士', singer: '薛之谦', src: './songs/绅士 - 薛之谦.mp3', imageUrl: './images/songs/shenshi.jpg' },
            { id: 4, name: '认真的雪', singer: '薛之谦', src: './songs/认真的雪 - 薛之谦.mp3', imageUrl: './images/songs/renzhendexue.jpg' },
        ]
    }

    getSongList () {// 保护类实例的私有数据
        return this.songList
    }

}




// 创建播放器实例的真正的类
class PlayerInstance {
    constructor () {
        // 需要用到的dom 原生
        this.el = document.querySelector('#audio') // audio dom
        this.$el = $(this.el) // audio jquery-dom
        this.osongImage = $('.player-ui__img--song img')
        this.osongName = $('.player-ui__text--song')
        this.osingerName = $('.player-ui__text--singer')
        this.oBgEl = $('.player-ui__bg')

        this.playBtn = new PlayerBtn('.player-ui__btn--play', {
            'click': this.playAndPauseHandler.bind(this),
            // 'dblclick'
        })

        this.songList = new Music().getSongList() // 歌曲信息

        // 页面中任何的显示不同都应该由数据来控制 MVC
        this.songIndex = 0  // 当前歌曲的索引
    }

    init () {// 初始化方法
        this.renderSongHandler() // 渲染默认的歌曲
    }

    renderSongHandler () {// 渲染歌曲的处理
        let { src, name, singer, imageUrl } = this.songList[this.songIndex]
        this.el.src = src;
        this.osongImage.attr('src', imageUrl)
        this.osongName.html(name)
        this.osingerName.html(singer)
        this.oBgEl.css('background-image', `url(${ imageUrl })`)
    }

    playAndPauseHandler () {// 处理播放和暂停
        if ( this.el.paused ) {
            this.el.play()
        } else {
            this.el.pause()
        }
    }

    bindEvents () { // 绑定事件的方法
        
    }
}

// 按钮类，可以更方便的获取按钮并绑定事件
class PlayerBtn {
    constructor (selector, options) {
        this.el = $(selector)[0]
        this.options = options
        this.bindEvents()
    }
    bindEvents () {
        for( var key in this.options ) {
            this.el.addEventListener(key, this.options[key])
        }
    }
}




// 实例化出播放器的实例
new Player().init()



})();

