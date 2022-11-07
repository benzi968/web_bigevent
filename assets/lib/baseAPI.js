// 注意：每次调用$.get()或$.post()的时候
//会先调用ajaxPrefilter()这个函数
//在这个函数中可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(option){
    // 在发起ajax请求之前同一拼接请求的根路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
})