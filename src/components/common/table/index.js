import { useEffect, useState } from 'react';
import { Space, Table, Tag, DatePicker, Pagination, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';
import dayjs from 'dayjs';
import { post } from '@/services/https';

import InputSearch from '../inputSearch';
import ExportIcon from '@/assets/icon/icon_export.png';
import ImportIcon from '@/assets/icon/icon_import.png';
import addIcon from '@/assets/icon/icon_add.png';
import deleteIcon from '@/assets/icon/icon_delete.png';
import notDelIcon from '@/assets/icon/icon_delete_not.png';

const { RangePicker } = DatePicker;

const TableWrapper = (props) => {
  const {
    columns,
    apiUrl,
    showEI,
    onImport,
    onExport,
    showAD,
    onAdd,
    onDelete,
    rowSelection,
    isShowDatepick = false,
    isShowSearch = false,
  } = props;
  const dateFormat = 'YYYY/MM/DD HH:mm:ss';
  const defaultTimeRange = [dayjs().subtract(1, 'months'), dayjs()];
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]); //数据源
  const [total, setTotal] = useState(0); //总数
  const [currPage, setCurrPage] = useState(1); //当前页码
  const [timeRange, setTimeRange] = useState(defaultTimeRange);
  const [query, setQuery] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //选中的id数组
  const [selectedRows, setSelectedRows] = useState([]); //选中数据
  const [delStatus, setDelStatus] = useState(false); //删除按钮状态
  const fetchData = () => {
    post(apiUrl).then((res) => {
      setDataSource(res.data);
      setTotal(res.total);
    });
    setLoading(false);
  };
  const onSearch = (value) => {
    setQuery(value);
    setCurrPage(1);
  };
  useEffect(() => {
    fetchData();
  }, [timeRange, query, currPage]);
  //选中触发
  const onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
    setDelStatus(selectedRowKeys.length); //添加删除框状态
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div>
        <div
          style={{
            padding: '0 12px 5px 12px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            {isShowDatepick && (
              <RangePicker
                showTime
                placeholder={['请选择开始时间', '请选择结束时间']}
                className={styles.rangePicker}
                popupClassName={styles.panel}
                defaultValue={defaultTimeRange}
                onChange={(val, time) => {
                  setTimeRange([time[0], time[1]]);
                  setCurrPage(1);
                }}
                format={dateFormat}
              />
            )}
            {isShowSearch && (
              <InputSearch placeholder="请输入用户名" search={onSearch} />
            )}
          </Space>
          {showEI && (
            <Space>
              <Button className={styles.button} onClick={onImport}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img style={{ display: 'inline-block' }} src={ImportIcon} />
                  <div style={{ marginLeft: 8 }}>导入</div>
                </div>
              </Button>
              <Button className={styles.button} onClick={onExport}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img style={{ display: 'inline-block' }} src={ExportIcon} />
                  <div style={{ marginLeft: 8 }}>导出</div>
                </div>
              </Button>
            </Space>
          )}
          {showAD && (
            <Space>
              <Button className={styles.button} onClick={onAdd}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img style={{ display: 'inline-block' }} src={addIcon} />
                  <div style={{ marginLeft: 8 }}>添加</div>
                </div>
              </Button>
              <Button
                className={styles.button}
                onClick={() => {
                  onDelete(selectedRowKeys, selectedRows);
                }}
                disabled={!delStatus}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    style={{ display: 'inline-block' }}
                    src={selectedRows.length > 0 ? deleteIcon : notDelIcon}
                  />
                  <div style={{ marginLeft: 8 }}>删除</div>
                </div>
              </Button>
            </Space>
          )}
        </div>
        <Table
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          rowKey="id"
          className={styles.table}
          rowSelection={
            rowSelection && {
              selectedRowKeys,
              onChange: onSelectedRowKeysChange,
            }
          }
          pagination={false}
          headerStyle={{
            backgroundColor: 'rgba(255,255,255,.1)',
          }}
        />
      </div>
      {total > 0 && (
        <div
          style={{
            display: 'flex',
            height: 44,
            marginTop: 'auto',
            paddingTop: 8,
            marginLeft: 10,
          }}
        >
          <Pagination
            size="small"
            pageSize={10}
            current={currPage}
            total={total}
            showSizeChanger={false}
            className={styles.pagination}
            hideOnSinglePage
            onChange={(page) => {
              setCurrPage(page);
            }}
          />
          <div style={{ lineHeight: '24px' }}>共{total}条</div>
        </div>
      )}
    </div>
  );
};
export default TableWrapper;
