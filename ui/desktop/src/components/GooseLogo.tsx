import { Goose } from './icons/Goose';
import { cn } from '../utils';

interface GooseLogoProps {
  className?: string;
  size?: 'default' | 'small';
  hover?: boolean;
}

export default function GooseLogo({
  className = '',
  size = 'default',
  hover = true,
}: GooseLogoProps) {
  const sizes = {
    default: {
      frame: 'w-16 h-16',
      goose: 'w-16 h-16',
    },
    small: {
      frame: 'w-8 h-8',
      goose: 'w-8 h-8',
    },
  } as const;

  const currentSize = sizes[size];

  return (
    <div
      className={cn(
        className,
        currentSize.frame,
        'relative overflow-hidden flex items-center justify-center',
        hover && 'group/with-hover'
      )}
    >
      <Goose
        className={cn(
          currentSize.goose,
          hover && 'transition-transform duration-300 group-hover/with-hover:scale-105'
        )}
      />
    </div>
  );
}
