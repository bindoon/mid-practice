import { fetch } from 'mfetch';

export const service = ({ values, pagination, sorter = {}, filters = {} }) =>
  fetch({
    url: 'https://randomuser.me/api',
    data: {
      results: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      ...values,
      ...filters,
    },
  })
    .then(res => res.json())
    .then(({ results }) => ({
      dataSource: results,
      ...pagination,
      total: 200,
    }));
