import GooseLogo from './GooseLogo';

interface FlyingBirdProps {
  className?: string;
  cycleInterval?: number; // milliseconds between bird frame changes
}

export default function FlyingBird({ className = '', cycleInterval = 150 }: FlyingBirdProps) {
  void cycleInterval;

  return (
    <GooseLogo
      size="small"
      hover={false}
      className={`siyuan-loading-logo transition-opacity duration-75 ${className}`}
    />
  );
}
