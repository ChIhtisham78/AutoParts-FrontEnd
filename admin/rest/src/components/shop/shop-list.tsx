import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import Badge from '@/components/ui/badge/badge';
import { ShopPaginator, SortOrder } from '@/types';
import TitleWithSort from '@/components/ui/title-with-sort';
import Link from '@/components/ui/link';
import { Shop, MappedPaginatorInfo } from '@/types';
import Avatar from '@/components/common/avatar';
import { NoDataFound } from '@/components/icons/no-data-found';
import { zipPlaceholder } from '@/utils/placeholders';

type IProps = {
  shops: Shop[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ShopList = ({
  shops,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  function isValidUrl(url: any) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc
          ? SortOrder.Asc
          : SortOrder.Desc,
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 130,
      render: (id: number) => `#${t('table:table-item-id')}: ${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-shop')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 250,
      className: 'cursor-pointer',
      onHeaderCell: () => onHeaderClick('name'),
      render: (name: any, { slug, logo }: any) => (
        <div className="flex items-center">
          <div className="relative aspect-square h-10 w-10 shrink-0 overflow-hidden rounded border border-border-200/80 bg-gray-100 me-2.5">
            <Image
              src={isValidUrl(logo) ? logo : zipPlaceholder}
              alt={name}
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw"
            />
          </div>
          <Link href={`/${slug}`}>
            <span className="truncate whitespace-nowrap font-medium">
              {name}
            </span>
          </Link>
        </div>
      ),
    },

    {
      title: (
        <TitleWithSort
          title={t('table:table-item-total-products')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'productCount'
          }
          isActive={sortingObj.column === 'productCount'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'productCount',
      key: 'productCount',
      align: 'center',
      width: 180,
      onHeaderCell: () => onHeaderClick('productCount'),
    },
    {
      title: (
        <TitleWithSort
          title={t('LLC Certificate')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'certificate'
          }
          isActive={sortingObj.column === 'certificate'}
        />
      ),
      className: 'cursor-pointer text-center align-middle', 
      dataIndex: 'certificateUrl',
      key: 'certificateUrl',
      align: 'center', 
      width: 180,
      render: (certificateUrl: string) => (
        certificateUrl ? (
          <div className="flex justify-center items-center h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetch(certificateUrl)
                  .then((response) => response.blob())
                  .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = certificateUrl.split('/').pop(); 
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                  })
                  .catch((err) => console.error('Error downloading the file:', err));
              }}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5v-9m0 9l-3-3m3 3l3-3M21 18.75v.75a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5v-.75"
                />
              </svg>
              {/* {t('Download')} */}
            </button>
          </div>
        ) : (
          <span className="text-gray-500">{t('No Certificate')}</span>
        )
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-total-orders')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'ordersCount'
          }
          isActive={sortingObj.column === 'ordersCount'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'ordersCount',
      key: 'ordersCount',
      align: 'center',
      onHeaderCell: () => onHeaderClick('ordersCount'),
      width: 180,
    },
    {
      title: t('table:table-item-owner-name'),
      dataIndex: 'ownerName',
      key: 'ownerName',
      align: alignLeft,
      width: 250,
      render: (ownerName: any) => (
        <div className="flex items-center">
          <Avatar
            name={ownerName}
            src={ownerName?.profile?.avatar?.thumbnail}
          />
          <span className="whitespace-nowrap font-medium ms-2">
            {ownerName}
          </span>
        </div>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-status')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'status'
          }
          isActive={sortingObj.column === 'status'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      onHeaderCell: () => onHeaderClick('status'),
      render: (status: boolean) => (
        <Badge
          textKey={status ? 'common:text-active' : 'common:text-inactive'}
          color={
            status
              ? 'bg-accent/10 !text-accent'
              : 'bg-status-failed/10 text-status-failed'
          }
        />
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: alignRight,
      width: 120,
      render: (id: string, { slug, is_active }: any) => {
        return (
          <ActionButtons
            id={id}
            approveButton={true}
            detailsUrl={`/${slug}`}
            isShopActive={is_active}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
          data={shops}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default ShopList;
