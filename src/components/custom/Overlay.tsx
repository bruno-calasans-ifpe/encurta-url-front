type OverlayProps = {
  children: React.ReactNode;
};

export default function Overlay({ children }: OverlayProps) {
  return (
    <div className="fixed h-full flex w-full items-center justify-center bg-stone-300 top-0 left-0">
      {children}
    </div>
  );
}
