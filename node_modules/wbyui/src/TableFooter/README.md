#### 安装
yarn install 

#### 引用
import { WBYTableFooter } from 'wbyui'

#### 参数
|参数名|数据类型|作用|
|----|-----:|:----:|
|plainOptions|array|当前页被允许参与批量的数据|
|selectedRowKeys|array|被选中的项|
|onChange|function|全选事件|
|title|string|全选按钮名称|
|pagination|object|分页器|

#### 提示
- pagination的传参方式与antd中pagination一致，传入false代表禁用分页器
- table底部其他组件在WBYTableFooter组件内部传入

#### 代码示例
```
    <Table
        columns={columns}
        dataSource={reservationList.item}
        rowKey='order_id'
        rowSelection={rowSelection}
        footer={
            () => <WBYTableFooter
                plainOptions={plainOptions}
                selectedRowKeys={this.state.selectedRowKeys}
                onChange={this.onCheckAllChange}
                title='全选'
                pagination={
                    {
                        current: reservationList.pagination.page,
                        pageSize: 20,
                        total: reservationList.pagination.total,
                        onChange: this.changePage
                    }
                }
            >
            </WBYTableFooter>
        }
    />
```




