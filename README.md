## 一、类名规范

1. 统一使用驼峰命名法
2. 语义化, 尽量不缩写
3. 不要出现中文名


## 二、类名示例

| 功能 / 部位 | 类名 | | 功能 / 部位 | 类名 |
| :---: | :----:  | :---: | :---: | :----:  |
| 容器 | container | | 页头 | header |
| 内容 | content | | 页尾 | footer |
| 页面主体 | main | | 侧栏 | column |
| 左右中 | left right center | | 页面外围 | wrapper |
| 导航 | mainNav | | 主导航 | column |
| 子导航 | subNav | | 菜单 | menu |
| 标题 | title | | 广告 | banner |
| 摘要 | summary | | 类目 | category |
| 标志 | logo | |巨幕 | jumbotron |
| 搜索 | search | | 前瞻 | previewer |
| 状态 | status | | 合作伙伴 | partner |
| 指南 | guild | |特征 | feature |
| 介绍 | intro |  |内容 | info |
| 信息 | inner |  |文案 | text |


## 三、LESS使用规范

1. 引用公用函数以及全局变量

```css
@import '~antd/lib/style/themes/default.less';
@import '~@/utils/utils.less';
```

2. 使用tab键来进行缩进

```css
.box {
  color: '#222';
}
```

3. 在左括号 { 前以及属性key与value保证一个空格

```css
.wrapper {
  width: 100px;
}
```

4. 在规则声明中存在多个选择器时，为每个选择器都留一行

```css
.box,
.container {
  width: 100px;
}
```

5. 在规则声明之间放置空白行

```css
.box {
  width: 100px;
}

.container {
  width: 200px;
}
```

6. 避免嵌套避免3层以上

```css
.wrapper {
  width: 100px;
  .container {
    width: 100%;
    .box {
      background-color: #222;
    }
  }
}
```

7. 属性顺序优先级 -模型-尺寸-边距-颜色-字体-特效等

```css
.wrapper {
  display: block;
  width: 100px;
  height: 20px;
  margin: 20px;
  padding: 19px;
  background-color: #222;
  font-size: 13px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 2);
  cursor: pointer;
}
```

8. 多使用选择器功能

```css
li:nth-child(2n) {
  background: #eee;
}
```

## 四、react内联规范

1. 基础使用方式

```js
const box = {
  background: '#222'
}

return (
  <div style={box}></div>
)
```

2. 使用驼峰格式命名

>我们将这些键作为组件中的styles对象的属性访问，因此使用驼峰是最方便的。

```js
// bad
{
  'bermuda-triangle': {
    display: 'none',
  },
}

// good
{
  bermudaTriangle: {
    display: 'none',
  },
}
```

3. 使用与设备无关的去命名媒体查询

>尽量使用"small", "medium", and "large",
>因为使用“电话”、“平板”和“桌面”等常用名称与现实世界中的设备不匹配。使用这些名称会带来错误的期望。

```js
// bad
const breakpoints = {
  mobile: '@media (max-width: 639px)',
  tablet: '@media (max-width: 1047px)',
  desktop: '@media (min-width: 1048px)',
};

// good
const breakpoints = {
  small: '@media (max-width: 639px)',
  medium: '@media (max-width: 1047px)',
  large: '@media (min-width: 1048px)',
};
```

4. 在组件之后定义样式

>我们使用更高阶的组件来设定主题，这会在组件定义之后使用。将styles对象直接传递给这个函数减少了间接性。

```js
// bad
const styles = {
  container: {
    display: 'inline-block',
  },
};

function MyComponent({ styles }) {
  return (
    <div {...css(styles.container)}>
      Never doubt that a small group of thoughtful, committed citizens can
      change the world. Indeed, it’s the only thing that ever has.
    </div>
  );
}

export default withStyles(() => styles)(MyComponent);

// good
function MyComponent({ styles }) {
  return (
    <div {...css(styles.container)}>
      Never doubt that a small group of thoughtful, committed citizens can
      change the world. Indeed, it’s the only thing that ever has.
    </div>
  );
}

export default withStyles(() => ({
  container: {
    display: 'inline-block',
  },
}))(MyComponent);
```

5. 在相同压痕级别的相邻块之间留空白行

>空格可以提高可读性，并减少合并冲突的可能性

```js
// bad
{
  box: {
    display: 'inline-block',
    '::before': {
      content: "''",
    },
  },
  universe: {
    border: 'none',
  },
}

// good
{
  box: {
    display: 'inline-block',

    '::before': {
      content: "''",
    },
  },

  universe: {
    border: 'none',
  },
}
```

6. 使用支持主题化的抽象层。

>有一组用于样式化组件的共享变量是很有用的。使用抽象层使这变得更加方便,这有助于防止组件与任何特定的底层实现紧密耦合，从而提供更多的自由度。

```js
// bad
export default withStyles(() => ({
  chuckNorris: {
    color: '#bada55',
  },
}))(MyComponent);

// good
export default withStyles(({ color }) => ({
  chuckNorris: {
    color: color.badass,
  },
}))(MyComponent);

// bad
export default withStyles(() => ({
  towerOfPisa: {
    fontFamily: 'Italiana, "Times New Roman", serif',
    fontSize: '2em',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
}))(MyComponent);

// good
export default withStyles(({ font }) => ({
  towerOfPisa: {
    ...font.italian,
  },
}))(MyComponent);
```

7. 抽离媒体查询板块。

```js
// bad
export default withStyles(() => ({
  container: {
    width: '100%',

    '@media (max-width: 1047px)': {
      width: '50%',
    },
  },
}))(MyComponent);

// good
export default withStyles(({ breakpoint }) => ({
  container: {
    width: '100%',

    [breakpoint.medium]: {
      width: '50%',
    },
  },
}))(MyComponent);
```

## 五、CSS Modules使用规范

1. 除特殊需要,避免修改全局antd的样式

```css
:global {
  .ant-input {
    width: 300px;
  }
}
```
