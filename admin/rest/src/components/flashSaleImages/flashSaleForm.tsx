import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlignType, Table } from '@/components/ui/table';
import { useTranslation } from 'next-i18next';
import Pagination from '@/components/ui/pagination';
import FileInput from '@/components/ui/file-input';
import { NoDataFound } from '@/components/icons/no-data-found';
import Modal from '@/components/Modal/modal';
import { useCreateImageMutation, useDeleteImageMutation ,useImagesQuery } from '@/data/client/uploadImage';
import LanguageSwitcher from '../ui/lang-action/language-switcher';
import { Category, FlashSaleImage } from '@/types';
import { Routes } from '@/config/routes';
import ActionButtons from '../common/action-buttons';

const CreateOrUpdateFlashSaleImageForm = () => {
  const { t } = useTranslation();
  const { control } = useForm();
  const { mutate: createImage } = useCreateImageMutation();
  const { mutate: deleteImage } = useDeleteImageMutation(); // Add delete mutation
  const { images = [], refetch } = useImagesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleDeleteImage = (id: number) => {
    deleteImage(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const columns = [
    {
      title: '#Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
      render: (id: number) => `#${id}`,
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      align: 'center',
      width: 400,
      render: (url: string) =>
        url ? (
          <img src={url} alt="Image" className="w-24 h-24 object-cover mx-auto" />
        ) : (
          <NoDataFound />
        ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'actions',
      align: 'center' as AlignType,
      render: (id: number) => (
        <div className="flex justify-center space-x-4">
          <button
            className="flex items-center justify-center"
            onClick={() => handleDeleteImage(id)}
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
      width: 200,
    },
  ];

  const onFileSelect = (file: any) => {
    setSelectedFile(file && file[0] ? file[0] : null);
  };

  const onFileSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      createImage(formData, {
        onSuccess: () => {
          refetch();
          setIsModalOpen(false);
          setSelectedFile(null);
        },
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          {t('Add Image')}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('Add Image')}>
        <FileInput name="file" control={control} multiple={false} onChange={onFileSelect} />
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => setIsModalOpen(false)}
          >
            {t('Cancel')}
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onFileSubmit}
          >
            {t('Save')}
          </button>
        </div>
      </Modal>

      <div className="mb-6 overflow-x-auto rounded shadow">
        <Table
          columns={columns}
          data={images}
          rowKey="id"
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
          scroll={{ x: 1000 }}
        />
      </div>

      {!!images?.length && (
        <div className="flex items-center justify-end">
          <Pagination total={images.length} current={1} pageSize={images.length} />
        </div>
      )}
    </div>
  );
};

export default CreateOrUpdateFlashSaleImageForm;
