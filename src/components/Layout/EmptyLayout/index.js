import Header from '../DefaultLayout/Header';

function EmptyLayout({ children }) {
    return <div className="w-full h-full   flex items-center justify-center">{children}</div>;
}

export default EmptyLayout;
