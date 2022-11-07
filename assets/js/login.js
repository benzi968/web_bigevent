$(function(){
    // 点击“去注册账号”的链接
    $("#link_reg").on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $("#link_login").on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })
})

/* 从layui中获取  form对象 */
var form = layui.form
// 从layui中获取 layer对象
var layer = layui.layer


// 通过form.verify()函数自定义校验规则
form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    //   校验两次密码是否一致的规则
    repwd:function(value){
        // 形参是确认密码框中的内容
        var pwd = $('.reg-box [name=password]').val()
        if(pwd!=value){
            return '两次密码不一致'
        }
    }
})

// 监听注册表单的提交事件
$('#form-reg').on('submit',function(e){
    e.preventDefault()
//    获取表单中的数据 为后续往服务器提交做准备
    var data = {username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val()}
     // 注册时向服务器发起post的请求
    $.post('/api/reguser',data,
    function(res){
        if(res.status !== 0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录');
        // 模拟人的点击行为  如果注册成功 自动跳转到登录页面去登录
        $('#link_login').click()
    })
})

// 监听登录表单的登录行为
$('#form-login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        // 快速获取表单中的数据
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg('登录失败，请检查用户名/密码')
            }
            layer.msg('登录成功!')
            // 校验用户身份信息
            // console.log(res.token)

            // 将登录成功后的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)

            // 跳转到后台主页  使用js进行跳转
            location.href = '/index.html'
        }


    })
})