

# api

## DetailTable
| 参数    | 说明  | 类型          | 默认值 |
| ------- | :----------------------------: | ------------: | -----: |
| columns | 表格列的配置描述，具体项见下表 | ColumnProps[] | -      |
| dataSource | 数据数组	{} | ColumnProps{} | -      |
| columnCount | 总的列数	{} | Number | -      |
| className | 给table添加一个className | String | - |
| isFilterZero | 是否过滤为0的数据 | bool | true |
| isPendRight  | 补全行尾的最后一个单元格 |bool | false |
| isPendLast  | 补全表格最后一个单元格 |bool | false |



### ColumnProps
| 参数   | 说明   | 类型  | 默认值 |
| ------ | :-----: | ------: | -----: |
| key    | React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性， | Function(key, record) {} | -      |
| render | 生成复杂数据的渲染函数，| Function(key, record) {} | - |
| colspan | 横跨两列的单元格 | Number | - |
| dataIndex | 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法 | String | - |



## 如何使用

指定表格的数据源 `dataSource` 为一个数组。

```jsx
const dataSourceTest = {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    age12: 12,
    age13: 13,
    age14: 134,
    age15: 15
};

const columnsTest = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (key, record) => {
        console.log(record);

        return <Button>{record.name}</Button>
    }
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age11',
}, {
    title: '年龄',
    dataIndex: 'age12',
    key: 'age12',
}, {
    title: '年龄',
    dataIndex: 'age13',
    key: 'age13',
}, {
    title: '年龄',
    dataIndex: 'age14',
    key: 'age14',
    colspan: 3
}, {
    title: '年龄',
    dataIndex: 'age15',
    key: 'age15',
    colspan: 3
}, {
    title: '住址',
    dataIndex: 'address2',
    key: 'address2',
    colspan: 1
}, {
    title: '212313',
    dataIndex: 'address333',
    key: 'address333',
    colspan: 5
}];
const columnCountTest = 6


<DetailTable dataSource={dataSourceTest} className={'custom-table'} columnCount={6} columns={columnsTest} />,
```
