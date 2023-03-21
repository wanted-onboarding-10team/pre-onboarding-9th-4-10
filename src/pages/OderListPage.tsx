import { useState, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Data, TableColums } from 'types/types';

import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

import { Button, Input, Space, Table, InputRef } from 'antd';
import type { ColumnsType, ColumnType, TableProps } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { text } from 'stream/consumers';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';

const OrderListPage = () => {
  const data = useLoaderData() as Data[];
  //   console.log(data);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [selectDate, setSelectDate] = useState('2023-03-08');

  const selecetedData = data.filter(item => item.transaction_date === selectDate);
  console.log(selecetedData);

  type DataIndex = keyof Data;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Data> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Data> = [
    {
      title: '주문번호',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'ascend',
    },
    { title: '거래일자', dataIndex: 'transaction_date', key: 'transaction_date' },
    {
      title: '거래시간',
      dataIndex: 'transaction_time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      render: val => (val ? <a>완료</a> : ''),
      filters: [
        { text: '완료', value: true },
        { text: '미완', value: false },
      ],
      onFilter: (value, record): boolean => record.status === value,
    },
    { title: '고객번호', dataIndex: 'customer_id', key: 'customer_id' },
    {
      title: '고객이름',
      dataIndex: 'customer_name',
      key: 'customer_name',
      ...getColumnSearchProps('customer_name'),
    },
    { title: '가격', dataIndex: 'currency', key: 'currency' },
  ];

  // 날짜 선택
  const dateOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString);
    setSelectDate(dateString);
  };

  const defaultDate = dayjs('2023-03-08');
  return (
    <>
      <span>선택한 날짜</span>
      <Space direction='vertical'>
        <DatePicker onChange={dateOnChange} defaultValue={defaultDate} />
      </Space>

      <Table columns={columns} dataSource={selecetedData} pagination={{ pageSize: 50 }} />
    </>
  );
};

export default OrderListPage;
