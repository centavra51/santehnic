import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/FloatingContact';

export default function PublicLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <FloatingContact />
        </>
    );
}
