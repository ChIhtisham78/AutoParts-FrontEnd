import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Image } from '@/components/ui/image';
import banner1 from '@/assets/2.png';
import banner2 from '@/assets/3.png';
import banner3 from '@/assets/4.png';

interface Props {
  text?: string;
  className?: string;
}

const NotFoundHome: React.FC<Props> = ({ className, text }) => {
  const { t } = useTranslation();
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="w-full h-full flex items-center justify-center mb-5">
        <Image
          src={banner1}
          alt={text ? t(text) : t('text-no-result-found')}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full h-full flex items-center justify-center mb-5">
        <Image
          src={banner2}
          alt={text ? t(text) : t('text-no-result-found')}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={banner3}
          alt={text ? t(text) : t('text-no-result-found')}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default NotFoundHome;
