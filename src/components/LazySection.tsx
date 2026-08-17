import { Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent } from 'react';

interface LazySectionProps {
  component: LazyExoticComponent<ComponentType<unknown>>;
  id?: string;
  className?: string;
  placeholderClassName?: string;
}

export default function LazySection({
  component: Component,
  id,
  className = '',
  placeholderClassName = 'min-h-screen bg-lux-black',
}: LazySectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 600px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} id={id} className={className}>
      {visible ? (
        <Suspense fallback={<div className={placeholderClassName} />}>
          <Component />
        </Suspense>
      ) : (
        <div className={placeholderClassName} aria-hidden="true" />
      )}
    </div>
  );
}
