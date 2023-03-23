import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderCategory } from 'types';

const useFilter = (originData: OrderCategory[] | undefined) => {
  const [orgData, setOrgData] = useState<OrderCategory[]>();
  const [query] = useSearchParams();

  function filtering() {
    if (originData === undefined) return;

    const align = query.get('align');
    const status = query.get('status');
    const search = query.get('search');
    let filterdResult = [...(originData as OrderCategory[])];

    if (search) {
      const result = [...(filterdResult as OrderCategory[])];
      filterdResult = result.filter(order => order.customer_name.includes(search));
    }

    if (status) {
      const result = [...(filterdResult as OrderCategory[])];
      filterdResult = result.filter(order => order.status === JSON.parse(status));
    }

    if (align) {
      const duplicateData = [...filterdResult];
      if (align === 'id' || align === 'transaction_time') {
        duplicateData.sort((a, b) => {
          if (align === 'id') {
            return b.id - a.id;
          } else if (align === 'transaction_time') {
            const aTime = parseInt(a.transaction_time.split(' ')[1].replaceAll(':', ''));
            const bTime = parseInt(b.transaction_time.split(' ')[1].replaceAll(':', ''));
            return bTime - aTime;
          }

          return 0;
        });
      }
      filterdResult = duplicateData;
    }

    return setOrgData(filterdResult);
  }

  useEffect(() => {
    filtering();
  }, [query, originData]);

  return orgData;
};

export default useFilter;
