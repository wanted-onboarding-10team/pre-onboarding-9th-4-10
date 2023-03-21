import { useLoaderData } from 'react-router-dom';
import { Data, TableColums } from 'types/types';

import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { text } from 'stream/consumers';

const OrderListPage = () => {
  const data = useLoaderData() as Data[];
  //   console.log(data);

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
    { title: '고객이름', dataIndex: 'customer_name', key: 'customer_name' },
    { title: '가격', dataIndex: 'currency', key: 'currency' },
  ];

  const dateOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  //   const tableOnChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  //     console.log('params', pagination, filters, sorter, extra);
  //   };

  return (
    <>
      <h1>hello</h1>
      <Space direction='vertical'>
        <DatePicker onChange={dateOnChange} />
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        //   onChange={tableOnChange}
        pagination={{ pageSize: 50 }}
      />
    </>
  );
};

export default OrderListPage;
