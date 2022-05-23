/*
 * 2022/5/23 19:49
 * author: francesca
 * email: 1549465329@qq.com
 */
import {useEffect, useState} from 'react';
import {Card, Col, Pagination, Row, Space, Table} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {useRequest} from 'umi';
import ActionBuilder from './Builder/ActionBuilder';
import ColumnBuilder from './Builder/ColumnBuilder';
import styles from './index.less';

const Index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const init = useRequest<{ data: BasicApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`
  );
  console.log(init);

  useEffect(() => {
    init.run();
  }, [page, per_page]);
  const searchLayout = () => {

  };
  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Space>
            {ActionBuilder(init?.data?.layout?.tableToolBar)}
          </Space>
        </Col>
      </Row>
    );
  };
  const paginationChangeHandler = (_page: any, _per_page: any) => {
    console.log(_page, _per_page);
    setPage(_page);
    setPerPage(_per_page);
    // init.run();
  };
  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ...
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolbar}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={total => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );

  };


  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          rowKey="id"
          dataSource={init?.data?.dataSource}
          columns={ColumnBuilder(init?.data?.layout?.tableColumn)}
          // columns={[{
          //   title: 'ID',
          //   dataIndex: 'id',
          //   key: 'id'
          // }]
          //   .concat(init?.data?.layout?.tableColumn
          //     .filter((item) => item.hideInColumn !== true) || []
          //   )}

          // columns={init?.data?.layout?.tableColumn
          //   .filter((item) => item.hideInColumn !== true)
          //   .concat([{
          //     title: 'ID',
          //     dataIndex: 'id',
          //     key: 'id'}])}

          pagination={false}
          loading={init.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};
export default Index;
