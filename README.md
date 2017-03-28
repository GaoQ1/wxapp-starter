## 下载依赖
```javascript
  npm install
```

## 打包
```javascript
  npm run webpack
```

## 监听
```javascript
 npm run watch
```

## 目录结构

```
lib/                     --> webpack打包后的库文件
sass/                    --> sass源文件
scripts/                 --> 需要打包成commonjs的js文件
src/                     --> 微信小程序的主目录
webpack.config.js        --> webpack的配置文件
```

## 注意
 - sass源文件放在sass文件夹下，打包时会自动生成后缀[name].wxss到相对应src的目录下
 - 其他的参照小程序的规则
