type ReadingLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function ReadingLayout({
  title,
  children,
}: ReadingLayoutProps) {
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-6 sm:px-6">
      <div
        className="
          mx-auto
          max-w-xl
          rounded-md
          border
          border-[#e6dcc3]
          bg-[#fdf6e3]
          px-5
          py-6
          shadow-sm
        "
      >
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">
          {title}
        </h1>

        <article className="space-y-6 text-justify text-gray-800 leading-relaxed">
          {children}
        </article>
      </div>
    </main>
  );
}
