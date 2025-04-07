import Card from '@/components/common/card';
import { DownloadIcon } from '@/components/icons/download-icon';
import { useModalState } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import ImportProducts from './import-products';
import ImportVariationOptions from './import-variation-options';

const ExportImportView = () => {
  const { data: shopId } = useModalState();
  const { t } = useTranslation();
  return (
    <Card className="flex min-h-screen flex-col md:min-h-0">
      <div className="mb-5 w-full">
        <h1 className="text-lg font-semibold text-heading">
          {t('common:text-export-import')}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {/* Download template */}
        <a
          href={`${window.location.origin}/Test.xlsx`} 
          download="Test.xlsx" 
          className="flex h-36 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-border-base p-5 focus:border-accent-400 focus:outline-none"
        >
          <DownloadIcon className="w-10 text-muted-light" />
          <span className="mt-4 text-center text-sm font-semibold text-accent">
            Download CSV Template
          </span>
        </a>
        <ImportProducts />
        <a
          href={`${process?.env?.NEXT_PUBLIC_DOTNET_API_ENDPOINT}api/product/export/${shopId}`}
          target="_blank"
          className="flex h-36 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-border-base p-5 focus:border-accent-400 focus:outline-none"
          rel="noreferrer"
        >
          <DownloadIcon className="w-10 text-muted-light" />

          <span className="mt-4 text-center text-sm font-semibold text-accent">
            {t('common:text-export-products')}
          </span>
        </a>
      </div>
    </Card>
  );
};

export default ExportImportView;

{
  /* <a
          href={`${process?.env?.NEXT_PUBLIC_REST_API_ENDPOINT}/export-variation-options/${shopId}`}
          target="_blank"
          className="flex h-36 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-border-base p-5 focus:border-accent-400 focus:outline-none"
          rel="noreferrer"
        >
          <DownloadIcon className="w-10 text-muted-light" />
          <span className="mt-4 text-center text-sm font-semibold text-accent">
            {t('common:text-export-product-variations')}
          </span>
        </a> */
}
