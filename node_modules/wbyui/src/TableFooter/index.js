import React from 'react';
import { Checkbox, Pagination } from 'antd';
import "./index.less";

class WBYTableFooter extends React.Component {
	state = {
		selectedRowKeys: [],
		indeterminate: false,
		checkAll: false
	};

	onCheckAllChange = e => {
		this.props.onChange && this.props.onChange(e);
	};
	render() {
		const { selectedRowKeys = [], title, plainOptions = [] } = this.props;
		const indeterminate = !!selectedRowKeys.length && selectedRowKeys.length < plainOptions.length;
        const checkAll = selectedRowKeys.length > 0 && selectedRowKeys.length === plainOptions.length;
        const disabled = !plainOptions.length;
		return (
			<div className='wby-table-footer'>
				<div className='wby-table-footer-left'>
					{this.props.checkbox !== false && <Checkbox
						indeterminate={indeterminate}
						onChange={this.onCheckAllChange}
                        checked={checkAll}
                        disabled={disabled}
					>{title || "全选"}</Checkbox>}
                    {this.props.children}
				</div>
				<div className='wby-table-footer-right'>
					{this.props.pagination !== false && <Pagination {...this.props.pagination} />}
				</div>
			</div>
		);
	}
}

export default WBYTableFooter;
