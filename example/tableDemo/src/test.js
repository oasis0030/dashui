import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Checkbox } from 'antd';
import WBYTableFooter from './WBYTableFooter';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
}];
const plainOptions = data.map(item => item.key);

class App extends React.Component {
    state = {
        selectedRowKeys: []
    };
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({
            selectedRowKeys
        });
    }
    onChange = selectedRowKeys => {
        this.setState({
            selectedRowKeys
        });
    };

    getPlainOptions = (item = []) => {
		return item.filter(record => record.qc.status === '1');
	}

	onCheckAllChange = e => {
		this.setState({
			selectedRowKeys: e.target.checked ? plainOptions : []
		});
	};
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onChange,
        };
        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                    pagination={false}
                    footer={() => <WBYTableFooter
                        plainOptions={plainOptions}
                        selectedRowKeys={selectedRowKeys}
                        onChange={this.onCheckAllChange}
                        title={'全选'}
                        pagination={{
                            current: 1,
                            pageSize: 10,
                            total: 20
                        }}
                    >Check all</WBYTableFooter>}
                />


            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
