/*
 * 2022/5/23 22:05
 * author: francesca
 * email: 1549465329@qq.com
 */
import moment from 'moment';
import {Space, Tag} from 'antd';
import ActionBuilder from '@/pages/BasicList/Builder/ActionBuilder';


const ColumnBuilder = (tableColumn: BasicApi.TableColumn[]) => {
  // return [{
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'id'
  // }]
  //   .concat(init?.data?.layout?.tableColumn
  //     .filter((item) => item.hideInColumn !== true) || []
  //   );

  const newColumns: BasicApi.TableColumn[] = [];
  (tableColumn || []).forEach((column) => {
    if (column.hideInColumn !== true) {
      switch (column.type) {
        case 'datetime':
          column.render = (value: any) => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
          };
          break;

        case 'switch':
          column.render = (value: any) => {
            const option = (column.data || []).find((item) => {
              return item.value === value;
            });
            return <Tag>{option?.title}</Tag>;
          };
          break;

        case 'actions':
          column.render = (value: any) => {
            return <Space>{ActionBuilder(column.actions)}</Space>;
          };
          break;

        default:
          break;
      }


      newColumns.push(column);
    }

    // if (column.type === 'datetime') {
    //   column.render = (value: any) => {
    //     return moment(value).format('YYYY-MM-DD HH:mm:ss');
    //   };
    // }
    // if (column.hideInColumn !== true) {
    //   newColumns.push(column);
    // }
  });
  const idColumn = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }];
  return idColumn.concat(newColumns);
};
export default ColumnBuilder;
