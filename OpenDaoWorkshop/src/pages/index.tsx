import { Noto_Sans } from 'next/font/google';
import { Header } from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';


const notoSans = Noto_Sans({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
});

export default function Home() {
    return (
        <div className={`bg-[#0B161E] ${notoSans.className}`}>
            <Header />
            <Body />
            <Footer />

        </div>
    );
}
