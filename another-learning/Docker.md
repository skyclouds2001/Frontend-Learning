# Docker

## 简介

一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器

轻量级的虚拟机

| 特性 | 容器 | 虚拟机 |
| --- | --- | --- |
| 启动 | 秒级 | 分钟级 |
| 硬盘使用 | 一般为 MB | 一般为 GB |
| 系统资源 | 0~5% | 5~15% |
| 性能 | 接近原生 | 弱于原生 |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |

## 优势

* 更高效的利用系统资源
* 更快速的启动时间
* 一致的运行环境
* 持续交付和部署
* 更轻松的迁移
* 更轻松的维护和扩展

## 应用场景

* Web 应用的自动化打包和发布
* 自动化测试和持续集成、发布
* 在服务型环境中部署和调整数据库或其他的后台应用
* 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境

## 基本概念

### 镜像 Image

镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等），镜像不包含任何动态数据，其内容在构建之后也不会被改变

### 容器 Container

镜像和容器的关系类似于类和实例的关系；从一个镜像可以启动一个或者多个容器；镜像是静态的定义，容器是镜像运行时的实体；容器可以被创建、启动、停止、删除、暂停等

每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为容器存储层；容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡；因此，任何保存于容器存储层的信息都会随容器删除而丢失；因此容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化，所有的文件写入操作，都应该使用数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层

### 仓库 Repository

镜像仓库Repository是同一类镜像的集合，包含了不同tag（标签）的Docker镜像；从镜像仓库中来获取镜像时可以通过<仓库名>:<标签>的格式来指定具体版本的镜像，如果忽略标签，用latest作为默认标签

## 架构

Docker是一个典型的C/S架构的应用，它可以分为**Docker客户端**（平时敲的Docker命令）和**Docker服务端**（Docker守护进程）

Docker客户端通过REST API和服务端进行交互，docker客户端每发送一条指令，底层都会转化成REST API调用的形式发送给服务端，服务端处理客户端发送的请求并给出响应

## 镜像

### 查找

`docker search <name>`

查找结果字段

* NAME 镜像仓库源的名称
* DESCRIPTION 镜像的描述
* STARS 类似Github里面的 star
* OFFICIAL 是否docker官方发布
* AUTOMATED 自动构建

### 获取

`docker pull <repository>:<tag>`

默认获取自官方 Docker Hub

指定第三方仓库 `docker pull <Docker Registry地址:端口号><repository>:<tag>`

### 列举

列举全部 `docker image ls`

带参数列举 `docker image ls <name>`

### 删除

`docker rmi [选项] <镜像1> [<镜像2> ...]`

`docker image rm [选项] <镜像1> [<镜像2> ...]`

<镜像>可以是镜像短ID、镜像长ID、镜像名或者镜像摘要

### 构建

使用 Dockerfile 文本文件，包含了一条条构建镜像所需的指令和说明

构建指令 `docker build [选项] <上下文路径/URL/->`

工作原理

* 执行build命令
* Docker客户端会将构建命令后面指定的上下文路径下的所有文件打包成一个tar包，发送给Docker服务端
* Docker服务端收到客户端发送的tar包，然后解压，根据Dockerfile里面的指令进行镜像的分层构建

**上下文路径**本质上就是指定服务端上Dockerfile中指令工作的目录

## 容器

### 创建及启动

`docker run [选项] 镜像名称 [命令] [参数...]`

* -d：容器在后台运行
* -t：为容器重新分配一个伪输入终端，通常与-i同时使用
* -i：以交互模式运行容器，通常与-t同时使用
* -p：指定端口映射
* –name：为容器指定一个名称
* -e：设置环境变量
* –dns：指定容器使用的DNS服务器
* -m：设置容器使用内存最大值
* –net=”bridge”: 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
* –link：链接另一个容器
* -v：绑定卷
* –rm：退出容器后删除该容器

实质步骤

* 检查本地是否存在指定的镜像，不存在就从 registry 下载
* 利用镜像创建并启动一个容器
* 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
* 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
* 从地址池配置一个 ip 地址给容器
* 执行用户指定的应用程序
* 执行完毕后容器被终止

### 终止

`docker stop <container id>`

### 查看

`docker ps -a`

### 进入

`docker exec <container id>` （推荐）

`docker attach <container id>`

### 日志查看

`docker logs <container id>`

* -f : 跟踪日志输出
* –since :显示某个开始时间的所有日志
* -t : 显示时间戳
* –tail :仅列出最新N条容器日志

### 容器分析&镜像分析&数据卷分析

`docker inspect [选项] <镜像1> [<镜像2> ...]`

### 删除

`docker rm [-f] <container id>`

## 数据管理-数据卷

数据卷是一个可供一个或多个容器使用的特殊目录，它绕过 UFS，可以提供很多有用的特性

* 数据卷可以在容器之间共享和重用
* 对数据卷的修改会立马生效
* 对数据卷的更新，不会影响镜像
* 数据卷默认会一直存在，即使容器被删除

### 创建

`docker volume create <volume-name>`

### 查看

`docker volume ls`

### 挂载至容器

启动容器时，使用--mount将数据卷挂载在容器的目录里

### 删除

`docker volume rm <volume-name>`

`docker volume prune` 清理无主的数据卷

## 数据管理-挂载目录

使用 `--mount source=XXX,target=XXX` 命令实现挂载

## 网络

### 端口映射

* 可以通过-P或者-p参数来指定需要对外暴露的端口

`docker run -d -P <container-name>`

`docker run -d -p [ip:][hostPort:]containerPort nginx`

省略hostPort参数本地主机会自动分配一个端口

亦可以使用udp来指定映射到udp端口

映射容器的多个端口，可以使用多个-p参数；或直接使用范围变量

* 查看容器端口映射情况

`docker ps -l`

 (快捷指令) `docker port <container-id>`

* 查看相关日志

`docker logs <container-id>`

### 网络模式

使用 `docker network ls` 查看 docker 的网络模式

启动 docker 容器时使用 `--network=<name>` 指定使用的网络模式

* none  无网络功能，除了lo本地环回网卡，没有其他的网卡信息，不能接收信息，也不能对外发送信息
* host  禁用了Docker的网络隔离，直接共享宿主机的网络
* bridge  默认|挂载到宿主机的虚拟网桥docker0上

### 容器互联

自定义网桥 `docker network create -d bridge my-net`

移除网桥 `docker network rm my-net`

## Dockerfile

### `FROM`

指定一个基础镜像

`FROM <image> [AS <name>]`

`FROM <image>:<tag> [AS <name>]`

Dockerfile一般以FROM指令开始（允许在FROM之前由ARG指令定义一个变量）

Docker从17.05开始，支持多阶段构建，就是我们在Dockerfile中可以使用多个FROM指令，每个FROM指令都可以使用不同的基础镜像，每个FROM指令都可以使用不同的基础镜像，并且每条指令都会开始新阶段的构建；同时可以将资源从一个阶段复制到另一个阶段，在最终镜像中只保留所需要的内容

### `RUN`

在镜像容器中执行命令

`RUN <command>`

`RUN ["可执行文件", "参数1", "参数2"]`

RUN指令常见的用法就是安装包用apt-get，通常建议把update和install写在一条指令内，确保我们的Dockerfiles每次安装的都是包的最新的版本；同时也可以减少镜像层数，减少包的体积

### `WORKDIR`

用来指定工作目录

会将各层的当前目录修改为指定的工作目录；如果该目录不存在，WORKDIR会自动创建目录

### `COPY`

用于从构建上下文目录中复制文件到镜像内的目标路径中

`COPY [--chown=<user>:<group>] <源路径>... <目标路径>`

`COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]`

复制的文件可以是一个文件、多个文件或者通配符匹配的文件

特别注意，COPY指令只能复制文件夹下的文件，而不能复制文件夹本身

### `CMD`

用于执行目标镜像中包含的软件

`CMD <命令>`

`CMD ["可执行文件", "参数1", "参数2"...]`

RUN是用来执行docker build构建镜像过程中要执行的命令；而CMD指令在docker run时运行而非docker build，也就是启动容器的时候，它的首要目的在于为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束

容器在run的时候只能创建一次，因此一个Docker容器中也只能有一个CMD指令

### `ENTRYPOINT`

指定容器启动程序和参数

一个Dockerfile同样也只能有一个ENTRYPOINT指令

当指定了ENTRYPOINT后，CMD指令的含义发生了改变，不再是直接的运行其命令，而是将 CMD 的内容作为参数传给ENTRYPOINT指令

`<ENTRYPOINT> "<CMD>"`

### `VOLUME`

用于暴露任何数据库存储文件，配置文件，或容器创建的文件和目录

`VOLUME <路径>`
`VOLUME ["<路径1>", "<路径2>"...]`

可以事先指定某些目录挂载为匿名卷，这样在运行时如果用户不指定挂载，其应用也可以正常运行，不会向容器存储层写入大量数据

### `EXPOSE`

声明容器运行时提供服务的端口

`EXPOSE <端口1> [<端口2>...]`

好处在于，一个是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射；另一个好处则是在运行时使用随机端口映射时，也就是 `docker run -P` 时，会自动随机映射 EXPOSE 的端口

### `ENV`

用于设置环境变量

`ENV <key> <value>`

`ENV <key1>=<value1> <key2>=<value2>...`

### `ARG`

设置构建环境的环境变量，容器运行阶段不存在

## 项目实例

### Vue 项目

```text
FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/

EXPOSE 80
```

### express 项目

Dockerfile

```text
FROM node:10.15.3-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 8080

CMD npm run start
```

之所以先拷贝package*.json文件，安装依赖后再拷贝整个项目，是因为能够提高缓存的命中率

### Vue 项目多阶段构建

```text
FROM node:12 as compile

WORKDIR /app

COPY package.json ./

RUN npm install --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

FROM nginx:latest as serve

COPY default.conf /etc/nginx/conf.d/

COPY --from=compile /app/dist /usr/share/nginx/html/

EXPOSE 80
```

## 参考资料

* [前端抢饭碗系列之初识Docker容器化部署](https://xieyufei.com/2022/02/22/FrontEnd-Docker.html)
* [前端抢饭碗系列之Docker进阶部署](https://xieyufei.com/2022/03/22/FrontEnd-Docker-Advance.html)
