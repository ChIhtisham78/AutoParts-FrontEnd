import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ImportCsv from '@/components/ui/import-csv';
import { useShopQuery } from '@/data/shop';
import { useImportProductsMutation } from '@/data/import';

export default function ImportProducts() {
  const { t } = useTranslation('common');
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData } = useShopQuery({
    slug: shop as string,
  });
  const shopId = shopData?.result.id!;
  const { mutate: importProducts, isLoading: loading } =
    useImportProductsMutation();

  const handleDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length) {
      importProducts({
        shop_id: shopId,
        csv: acceptedFiles[0],
      });
    }
  };

  return (
    <ImportCsv
      onDrop={handleDrop}
      loading={loading}
      title={t('text-import-products')}
    />
  );
}
