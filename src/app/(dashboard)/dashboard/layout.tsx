type ClientLayoutProps = {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <div className="mx-auto w-full max-w-6xl px-6 py-12">{children}</div>
}
