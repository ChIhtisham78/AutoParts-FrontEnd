import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import noResult from '@/assets/Product not found.gif';
interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = ({ className, text }) => {
  const { t } = useTranslation();
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={noResult}
          alt={text ? t(text) : t('text-no-result-found')}
          className="w-full h-full object-contain"
        />
      </div>
      {text && (
        <h3 className="w-full text-center text-xl font-semibold text-body my-7">
          {t(text)}
        </h3>
      )}
    </div>
  );
};

export default NotFound;
