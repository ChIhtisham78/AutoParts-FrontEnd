import React, { useEffect, useState } from 'react';
import ActionButtons from '@/components/common/action-buttons';
import { NoDataFound } from '@/components/icons/no-data-found';
import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import TitleWithSort from '@/components/ui/title-with-sort';
import { HomePage, SortOrder } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDeleteHomePages, useGetHomePages } from '@/data/affiliatePage';
import LanguageSwitcher from '../ui/lang-action/language-switcher';
import { Routes } from '@/config/routes';

const CorporateInformationForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const [homePages, setHomePages] = useState<HomePage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deletehomepage } = useDeleteHomePages();
  const { mutate: fetchHomePages } = useGetHomePages();

  useEffect(() => {
    setIsLoading(true);
    fetchHomePages(undefined, {
      onSuccess: (data) => {
        setHomePages(data || []);
        setIsLoading(false);
      },
    });
  }, []);

  // Handle delete
  const handleDeleteImage = (id: number) => {
    deletehomepage(id, {
      onSuccess: () => {
        setHomePages((prev) => prev.filter((page) => page.id !== id));
      },
    });
  };

  const [sortingObj, setSortingObj] = React.useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      setSortingObj((prevState) => ({
        sort:
          prevState.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      }));
    },
  });

  const columns = [
    {
      title: (
        <TitleWithSort
          title={t('#Id')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'id'
          }
          isActive={sortingObj.column === 'id'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 80,
      onHeaderCell: () => onHeaderClick('id'),
      render: (id: number) => `#${id}`,
    },
    {
      title: (
        <TitleWithSort
          title={t('Title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'title'
          }
          isActive={sortingObj.column === 'title'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'title',
      key: 'title',
      align: alignLeft,
      width: 200,
      onHeaderCell: () => onHeaderClick('title'),
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: t('Slug'),
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
      width: 150,
      render: (slug: string) => <span>{slug}</span>,
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',
      align: alignLeft,
      width: 400,
      render: (text: string) => (
        <span>
          {text?.length > 140 ? `${text.substring(0, 140)}...` : text}
        </span>
      ),
    },
    {
      title: t('Actions'),
      key: 'actions',
      align: 'center',
      width: 150,
      render: (id: number, rowData: HomePage) => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => router.push(`/affiliatePrograms/${rowData.id}/edit`)}
            title="Edit"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-black-500 hover:text-black-600 transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.018 19.695a4.5 4.5 0 01-1.695 1.096l-3.325 1.11 1.11-3.325a4.5 4.5 0 011.096-1.695L16.862 3.487z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 7.5l6 6"
              />
            </svg>
          </button>
          <button
            className="flex items-center justify-center"
            onClick={() => handleDeleteImage(rowData.id)}
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-red-500 hover:text-red-600 transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M9 6v12m6-12v12M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6m-3 0V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          data={homePages}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 'max-content', y: 400 }}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CorporateInformationForm;
