# gulp-demo
Gulp  



什么是gulp? 

一种用自动化构建工具来增强你的工作流程！ ( https://www.gulpjs.com.cn/ )。

通俗易懂点就是前端的打包工具。



为什么要用gulp,它有什么优点？同样是打包工具，那么它和webpack有什么区别？

官网介绍：

1、易于使用

通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。

2、搭建快速

利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。

3、插件高质

Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。

4、易于学习

通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。



我自己的理解：

1、gulp：它是可以进行js，html，css，img的压缩打包，将多个js文件或是css文件压缩成一个文件，并且可以压缩为一行，以此来减少文件体积，加快请求速度和减少请求次数；并且gulp有task定义处理事务，从而构建整体流程，它是基于流的自动化构建工具。

gulp的代码更加简单易懂，需要压缩合并谁就用哪个方法



2、webpack是前端构建工具，实现了模块化开发和文件处理。他的思想就是“万物皆为模块”，它能够将各个模块进行按需加载，不会导致加载了无用或冗余的代码。所以他还有个名字叫前端模块化打包工具。(咱们的公众号就是基于vue-cli打包的 ，配置类似于webpack)

webpack则可以将具体的模块进行划分，需要哪个模块就加载哪个模块，实现按需加载，并且排除掉冗余代码，减少代码体积。



怎么运行gulp?

1、全局安装gulp

    npm install --global gulp 

查看版本

2、局部安装gulp，这是安装到你项目的根目录

    npm install gulp --save-dev

3、在项目根目录下创建一个名为 gulpfile.js 的文件

    var gulp = require('gulp');
    
    gulp.task('default', ()=>{
        // 将你的默认的任务代码放在这
        console.log('Hello World!');
    })

运行成功，但是有报错

解决方法，使用 async 和 await。修改后的代码

    var gulp = require('gulp');
    
    gulp.task('default',async()=>{
        // 将你的默认的任务代码放在这
        await console.log('Hello World!');
    })

此时运行成功，并且无报错了

4、执行npm init之后会在当前工作目录下创建一个全新的package.json文件。package.json主要用于存放模块的名称、版本、作者、机构、模块入口、依赖项等信息。在配置好依赖项后，npm install命令可以安装package.json中的全部开发依赖项



5、引入模块 （举例）





6、运行gulp。（默认的名为 default 的任务（task）将会被运行，想要单独执行特定的任务（task），请输入 gulp <task> <othertask>）



运行时，则是

    gulp fileinclude

7、按需下载你需要的模块 



happy，ending~









