import { forwardRef } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];

const OptimizedImage = forwardRef<HTMLPictureElement, OptimizedImageProps>(
  ({ src, alt, className, priority, ...rest }, ref) => {
    const lowerSrc = src.toLowerCase();
    const ext = SUPPORTED_EXTS.find((e) => lowerSrc.endsWith(e));

    if (!ext || src.startsWith('http')) {
      return (
        <img
          ref={ref as React.Ref<HTMLImageElement>}
          src={src}
          alt={alt}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'low'}
          {...rest}
        />
      );
    }

    const base = src.slice(0, -ext.length);
    const avifSrc = `${base}.avif`;
    const webpSrc = `${base}.webp`;

    return (
      <picture ref={ref}>
        <source srcSet={avifSrc} type="image/avif" sizes={rest.sizes} />
        <source srcSet={webpSrc} type="image/webp" sizes={rest.sizes} />
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'low'}
          {...rest}
        />
      </picture>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
