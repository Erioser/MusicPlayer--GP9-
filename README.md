# MusicPlayer--GP9-
> 本应用是利用HTML5提供的Audio标签搭配JQuery开发完成的音乐播放器，当前版本为1.0版本

### 项目结构
music-player  项目主体目录
-fonts 字体目录
-images 图片资源
-javascripts 脚本资源
---jquery.min.js JQuery类库
---player.js 主要脚本
---util.js  工具
-songs 音频文件资源
-stylesheets 样式资源
---reset.css 样式重置
---player.css 播放器样式
-index.html 项目首页

### 项目功能模块

1. 界面结构：

    * 上半部分的音乐播放显示功能
    * 下半部分的音乐列表显示功能

2. 功能结构

    * 播放暂停
    * 循环模式切歌 (2.0)
    * 歌曲显示切换
    * 列表选歌
    * 播放进度显示
    * 播放进度调整
    * 音量调整

### 实现过程

1. 实现了音乐播放器的简单布局结构，使用了BEM命名与OOCSS样式编写方式

2. 简单实现了音乐播放的暂停与播放功能

    * 利用了单例模式构建了播放器的实现类Player，为了避免存储实例在全局变量中可能会出现的问题（变量重新赋值，命名冲突），实现的依据让实现类任何情况下只能实例化出同一个实例。

    * 因为音乐在新版本的更新迭代中可能会出现音乐数据的异步获取/更新/删除等操作，为了将音乐数据的逻辑与播放器的逻辑焦点分离，所以实现了音乐数据类 Music

    * 在Player中将音乐视图渲染封装成独立的方法renderSongHandler，在此方法中会根据当前播放歌曲的索引得到真正的歌曲数据然后render在视图中，首先，根据数据驱动这样的传统MV*结构思路将影响播放歌曲的数据抽象成一个Model就是逻辑中的songIndex

    Model -> songIndex; View -> 页面中的歌曲显示；Controller -> 控制M的数据与V中的歌曲显示对应;

    在一般的前端功能实现中，不会再逻辑运算中直接操作DOM，而且将DOM的标签抽离成Model，再逻辑中操控Model，同期的利用依据封装号的各个动作，根据更新的Model来render View.

    * 实现了PlayerBtn类来承担播放器中按钮的部分逻辑（获取按钮的DOM，绑定事件的动作）

    * 利用AudioAPI中的paused属性与play/pause方法实现了播放与暂停功能

    * 再Player类中实现了切换歌曲的方法changeSongHandler，通过传入boolean和number来指定切换的是上一首/下一首/固定的某一首歌曲
    
    * 我们将循环模式抽离表现Model为loopMode，切歌的动作中利用changeIndexDependLoop方法来根据loopMode来更改songIndex，然后re-render

    注意：如果歌曲切换前处于播放状态，切歌后依然需要处理播放状态，所以需要再切歌之前记录当前状态，切歌后进行是否播放的动作。

    * 实现了Progress类来承载进度条的逻辑，通过传入min，max，value来指定progress初始的显示状态，并且暴露的setProgress方法用来再歌曲播放的过程中不断的更新progress的表现，提供handler配置项可以配置一个接收进度调整之后计算得到的目标值的函数，用以点击更改歌曲进度和音量

    * 再Audio里利用canplay事件获取了音乐的时长，并且进行progress的实例化，但是因为修改了当前播放提交的时候canplay重新触发会导致progress重复实例化，所以判断后阻止了重复实例化带啦的问题

    * 封装了Util类，实现了部分的常用工具函数，例如时间转换方式，利用此方法更改页面中的播放时间显示s -> minutes:seconds

    * 换歌之后依然需要在canplay中更改歌曲的总时长为当前歌曲的时长，在timeupdate事件中利用setProgress方法动态的进度条的显示

    * 利用Audio的ended事件监听歌曲播放完成后进行下一曲操作

    * 抽离了volume Model数据来表示视图中音乐音量，实例化对应的Progress承载音量的操作逻辑

### 2.0版本更新内容

1. 需要拥有音量静音的功能（利用Audio的muted属性）

2. 灵活切换循环模式为单曲循环/随机播放/列表循环三种模式
    







