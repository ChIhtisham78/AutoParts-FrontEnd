import { UploadIcon } from '@/components/icons/upload-icon';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Attachment } from '@/types';
import { CloseIcon } from '@/components/icons/close-icon';
// import Loader from '@/components/ui/loader/loader';
import Spinner from '@/components/ui/loaders/spinner/spinner';

import { useTranslation } from 'next-i18next';

import Image from 'next/image';
// import { zipPlaceholder } from '@/utils/placeholders';
// import { ACCEPTED_FILE_TYPES } from '@/utils/constants';

import classNames from 'classnames';
// import { processFileWithName } from '../product/form-utils';
import cn from 'classnames';
import { useUploadMutation } from '@/framework/settings';

export const ACCEPTED_FILE_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'application/pdf': [],
  'application/zip': [],
  'application/vnd.rar': [],
  'application/epub+zip': [],
  '.psd': [],
};

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};
export default function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
  helperText,
  maxSize,
  maxFiles,
  disabled,
}: any) {
  const { t } = useTranslation();
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const { mutate: upload, isLoading: loading } = useUploadMutation();
  const [error, setError] = useState<string | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile
      ? {
          accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
          },
        }
      : { ...ACCEPTED_FILE_TYPES }),
    multiple,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles[0], 'acceptedFiles');
      if (acceptedFiles.length) {
        const data: any[] = [];
        upload(
          acceptedFiles, // it will be an array of uploaded attachments
          {
            onSuccess: (data1: any) => {
              data.push(data1);

              // Process Digital File Name section
              console.log(data, 'data');
              data &&
                data?.map((file: any, idx: any) => {
                  const splitArray = file?.message?.split('/');
                  let fileSplitName =
                    splitArray[splitArray?.length - 1]?.split('.');
                  const fileType = fileSplitName?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
                  const filename = fileSplitName?.join('.'); // it will join the array with dot, which restore the original filename
                  data[idx]['file_name'] = filename + '.' + fileType;
                  console.log(data[idx], 'data[idx]');
                });

              let mergedData;
              if (multiple) {
                mergedData = files.concat(data);
                setFiles(files.concat(data));
                console.log(mergedData, 'mergedData');
              } else {
                mergedData = data[0];
                setFiles(data);
                console.log(mergedData, 'mergedData');
              }
              if (onChange) {
                onChange(mergedData);
              }
            },
          },
        );
      }
    },
    // maxFiles: 2,
    maxSize: maxSize,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file?.errors?.forEach((error) => {
          if (error?.code === 'file-too-large') {
            setError(t('error-file-too-large'));
          } else if (error?.code === 'file-invalid-type') {
            setError(t('error-invalid-file-type'));
          }
        });
      });
    },
  });

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file.thumbnail !== image);
    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };
  const thumbs = files?.map((file: any, idx) => {
    const imgTypes = [
      'tif',
      'tiff',
      'bmp',
      'jpg',
      'jpeg',
      'webp',
      'gif',
      'png',
      'eps',
      'raw',
    ];
    // let filename, fileType, isImage;
    if (file) {
      console.log('hmmm', file);
      // const processedFile = processFileWithName(file);
      const splitArray = file?.file_name
        ? file?.file_name.split('.')
        : file?.message?.split('.');
      const fileType = splitArray?.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
      const filename = splitArray?.join('.'); // it will join the array with dot, which restore the original filename
      const isImage = file?.message && imgTypes.includes(fileType); // check if the original filename has the img ext

      return (
        <div
          className={cn(
            'relative mt-2 inline-flex flex-col overflow-hidden rounded me-2',
            isImage ? 'border border-border-200' : '',
            disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : '',
          )}
          key={idx}
        >
          {/* {file?.thumbnail && isImage ? ( */}
          {isImage ? (
            // <div className="flex items-center justify-center w-16 h-16 min-w-0 overflow-hidden">
            //   <Image
            //     src={file.thumbnail}
            //     width={56}
            //     height={56}
            //     alt="uploaded image"
            //   />
            // </div>
            <figure className="relative flex items-center justify-center h-16 w-28 aspect-square">
              <Image
                src={file.message}
                alt={filename}
                fill
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </figure>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center min-w-0 overflow-hidden h-14 w-14">
                {/* <Image
                  src={zipPlaceholder}
                  width={56}
                  height={56}
                  alt="upload placeholder"
                /> */}
                {/* <UploadIcon className="text-muted-light" /> */}
              </div>
              <p className="flex items-baseline p-1 text-xs cursor-default text-body">
                <span
                  className="inline-block max-w-[64px] overflow-hidden overflow-ellipsis whitespace-nowrap"
                  title={`${filename}.${fileType}`}
                >
                  {filename}
                </span>
                .{fileType}
              </p>
            </div>
          )}
          {/* {multiple ? (
          ) : null} */}
          {!disabled ? (
            <button
              className="absolute flex items-center justify-center w-4 h-4 text-xs bg-red-600 rounded-full shadow-xl outline-none top-1 text-light end-1"
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          ) : (
            ''
          )}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Reset error after upload new file
      setError(null);

      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files],
  );

  return (
    <section className="upload">
      <div
        {...getRootProps({
          className: classNames(
            'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none relative',
            disabled
              ? 'pointer-events-none select-none opacity-80 bg-[#EEF1F4]'
              : 'cursor-pointer',
          ),
        })}
      >
        {!disabled ? <input {...getInputProps()} /> : ''}
        <UploadIcon className="text-muted-light" />
        <p className="mt-4 text-sm text-center text-body">
          {helperText ? (
            <span className="font-semibold text-gray-500">{helperText}</span>
          ) : (
            <>
              <span className="font-semibold text-accent">
                {t('text-upload-highlight')}
              </span>{' '}
              {t('text-upload-message')} <br />
              <span className="text-xs text-body">{t('text-img-format')}</span>
            </>
          )}
        </p>
        {error && (
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        )}
      </div>

      {(!!thumbs.length || loading) && (
        <aside className="flex flex-wrap mt-2">
          {!!thumbs.length && thumbs}
          {loading && (
            <div className="flex items-center h-16 mt-2 ms-2">
              <Spinner simple={true} className="w-6 h-6" />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}

// import { useEffect, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { useTranslation } from 'next-i18next';
// import { UploadIcon } from '@/components/icons/upload-icon';
// import Spinner from '@/components/ui/loaders/spinner/spinner';
// import { useUploadMutation, useUploads } from '@/framework/settings';

// export default function Uploader({
//   onChange,
//   value,
//   name,
//   onBlur,
//   multiple = false,
// }: any) {
//   const { t } = useTranslation('common');
//   const { mutate: upload, isLoading: loading } = useUploadMutation();

//   const onDrop = useCallback(
//     (acceptedFiles: any) => {
//       upload(acceptedFiles);
//     },
//     [upload],
//   );
//   const { getRootProps, getInputProps } = useDropzone({
//     //@ts-ignore
//     accept: 'image/*',
//     multiple,
//     onDrop,
//   });
//   //FIXME: package update need to check
//   // types: [
//   //   {
//   //     description: 'Images',
//   //     accept: {
//   //       'image/*': ['.png', '.gif', '.jpeg', '.jpg']
//   //     }
//   //   },
//   // ],
//   // excludeAcceptAllOption: true,
//   // multiple: false
//   const thumbs = files.map((file: any, idx) => (
//     <div
//       className="relative inline-flex flex-col mt-2 overflow-hidden border rounded border-border-100 ltr:mr-2 rtl:ml-2"
//       key={idx}
//     >
//       <div className="flex items-center justify-center w-16 h-16 min-w-0 overflow-hidden">
//         {/* eslint-disable */}
//         <img src={file.message} alt={file?.name} />
//       </div>
//     </div>
//   ));
//   //FIXME: maybe no need to use this
//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach((file: any) => URL.revokeObjectURL(file.preview));
//     },
//     [files],
//   );

//   return (
//     <section className="upload">
//       <div
//         {...getRootProps({
//           className:
//             'border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
//         })}
//       >
//         <input
//           {...getInputProps({
//             name,
//             onBlur,
//           })}
//         />
//         <UploadIcon className="text-muted-light" />
//         <p className="mt-4 text-sm text-center text-body">
//           <span className="font-semibold text-accent">
//             {t('text-upload-highlight')}
//           </span>{' '}
//           {t('text-upload-message')} <br />
//           <span className="text-xs text-body">{t('text-img-format')}</span>
//         </p>
//       </div>

//       <aside className="flex flex-wrap mt-2">
//         {!!thumbs.length && thumbs}
//         {isLoading && (
//           <div className="flex items-center h-16 mt-2 ltr:ml-2 rtl:mr-2">
//             <Spinner
//               text={t('text-loading')}
//               simple={true}
//               className="w-6 h-6"
//             />
//           </div>
//         )}
//       </aside>
//     </section>
//   );
// }
