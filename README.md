

##splitText

这是一个可以用来给段落文字添加动画效果的插件，不依赖jquery，但是依赖于GreenSock的TweenMax和TimelineMax，GreenSock官方是有splitText插件的，但是需要付费加入会员才能得到，所以就自己写了一个简易版本，以后可能会不断改善吧。


-------------------------------


使用方法:
splitText( '#foo', {
    type: 'chars',
    animate: 'bounceInDown',
    duration: 0.8,
    delay: "+=0.6",
    restore: true
} )

选项: {
    type:  [ 'chars' | 'lines' ],
    animate: 'bounceInDown',
    duration: 0 ~ 1,
    delay: "[ -= | += ] 0 ~ 1",
    restore: [ true | false ]
}
