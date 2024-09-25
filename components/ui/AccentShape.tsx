const AccentShape = ({ className }: { className?: string }) => (
  <div className={`absolute w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob ${className}`}></div>
);

export default AccentShape;