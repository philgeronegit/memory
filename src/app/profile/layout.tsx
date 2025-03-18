export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="h-screen">{children}</section>;
}
