import Input from '@/components/ui/input';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/label';
import FileInput from '@/components/ui/file-input';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { Config } from '@/config';
import { useRouter } from 'next/router';
import Alert from '@/components/ui/alert';

type IProps = {
  initialValues: any;
};

export default function ProductSimpleForm({ initialValues }: IProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isTranslateProduct = locale !== Config.defaultLanguage;

  const is_digital = watch('is_digital');
  const is_external = watch('is_external');

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={t('form:form-title-simple-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-price')}*`}
          {...register('price')}
          type="number"
          error={t(errors.price?.message!)}
          variant="outline"
          className="mb-5"
        />

        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          {...register('quantity')}
          error={t(errors.quantity?.message!)}
          variant="outline"
          className="mb-5"
          // Need discussion
          disabled={isTranslateProduct}
        />

        <Input
          label={`${t('form:input-label-sku')}*`}
          {...register('sku')}
          note={
            Config.enableMultiLang
              ? `${t('form:input-note-multilang-sku')}`
              : ''
          }
          error={t(errors.sku?.message!)}
          variant="outline"
          className="mb-5"
          disabled={isTranslateProduct}
        />

        <Input
          label={t('form:input-label-width')}
          {...register('width')}
          error={t(errors.width?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-height')}
          {...register('height')}
          error={t(errors.height?.message!)}
          variant="outline"
          className="mb-5"
        />
        <Input
          label={t('form:input-label-length')}
          {...register('length')}
          error={t(errors.length?.message!)}
          variant="outline"
          className="mb-5"
        />
        {/* New Product Entities */}
        <Input
          label={'Year'}
          {...register('year')}
          // error={t(errors.length?.message!)}
          placeholder="2002"
          variant="outline"
          type="number"
          className="mb-5"
        />
        <Input
          label={'Mileage'}
          {...register('mileage')}
          // error={t(errors.length?.message!)}
          placeholder="100000"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Grade'}
          {...register('grade')}
          // error={t(errors.length?.message!)}
          placeholder="B"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Damage'}
          {...register('damage')}
          // error={t(errors.length?.message!)}
          placeholder="0"
          variant="outline"
          className="mb-5"
          type="number"
        />
        <Input
          label={'Trim Level'}
          {...register('trimLevel')}
          // error={t(errors.length?.message!)}
          placeholder="LX"
          variant="outline"
          className="mb-5"
        />
        {/* <Input
          label={'Engine'}
          {...register('engine')}
          // error={t(errors.length?.message!)}
          placeholder="1.7"
          variant="outline"
          className="mb-5"
          type="number"
        /> */}
        <Input
          label={'Trasmission'}
          {...register('transmission')}
          // error={t(errors.length?.message!)}
          placeholder="Automatic"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Drive Train'}
          {...register('driveTrain')}
          // error={t(errors.length?.message!)}
          placeholder="FWD"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'new/used'}
          {...register('newUsed')}
          error={t(errors.newUsed?.message!)}
          placeholder="Used"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'OEM Part Number'}
          {...register('oemPartNumber')}
          // error={t(errors.length?.message!)}
          placeholder="L1MZ11002A"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Parts Link Number'}
          {...register('partsLinkNumber')}
          // error={t(errors.length?.message!)}
          placeholder="HO1234567"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Hollander Ic'}
          {...register('hollanderIc')}
          // error={t(errors.length?.message!)}
          placeholder="640-10111"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Stock Number'}
          {...register('stockNumber')}  
          // error={t(errors.length?.message!)}
          placeholder="2306834"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Tag Number'}
          {...register('tagNumber')}
          // error={t(errors.length?.message!)}
          placeholder="000000"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Location'}
          {...register('location')}
          // error={t(errors.length?.message!)}
          placeholder="32.05"
          variant="outline"
          type="number"
          className="mb-5"
        />
        <Input
          label={'Site'}
          {...register('site')}
          // error={t(errors.length?.message!)}
          placeholder="BGE"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'VIN'}
          {...register('vin')}
          // error={t(errors.length?.message!)}
          placeholder="JHMFA9F34NS100001"
          variant="outline"
          className="mb-5"
        />
        <Input
          label={'Core'}
          {...register('core')}
          // error={t(errors.core?.message!)}
          placeholder="60"
          variant="outline"
          className="mb-5"
          type="number"
        />
        <Input
          label={'Color'}
          {...register('color')}
          // error={t(errors.length?.message!)}
          placeholder="Silver"
          variant="outline"
          className="mb-5"
        />
        {/* <Checkbox
          {...register('is_digital')}
          id="is_digital"
          label={t('form:input-label-is-digital')}
          disabled={Boolean(is_external)}
          className="mb-5"
        />

        <Checkbox
          {...register('is_external')}
          id="is_external"
          label={t('form:input-label-is-external')}
          disabled={Boolean(is_digital)}
          className="mb-5"
        /> */}

        {/* {is_digital ? (
          <>
            <Label>{t('form:input-label-digital-file')}</Label>
            <FileInput
              name="digital_file_input"
              control={control}
              multiple={false}
              acceptFile={true}
              defaultValue={{}}
            />
            <Alert
              message={t('form:info-about-digital-product')}
              variant="info"
              closeable={false}
              className="mt-5 mb-5"
            />
            <input type="hidden" {...register(`digital_file`)} />
            {
              // @ts-ignore
              errors.digital_file_input && (
                <p className="my-2 text-xs text-red-500 text-start">
                  {
                    // @ts-ignore
                    t('form:error-digital-file-is-required')
                  }
                </p>
              )
            }
          </>
        ) : null}
        {is_external ? (
          <div>
            <Input
              label={t('form:input-label-external-product-url')}
              {...register('external_product_url')}
              error={t(errors.external_product_url?.message!)}
              variant="outline"
              className="mb-5"
            />
            <Input
              label={t('form:input-label-external-product-button-text')}
              {...register('external_product_button_text')}
              error={t(errors.external_product_button_text?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>
        ) : null} */}
      </Card>
    </div>
  );
}
