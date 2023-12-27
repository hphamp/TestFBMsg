import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Contact from '~/pages/Contact';
import ItemDetail from '~/pages/ItemDetail';
import ItemGroup from '../pages/ItemGroup';
import Items from '../pages/ItemsWIgID';
import Payment from '../pages/Payment';
import Infomation from '../pages/Infomation';
import Introduce from '~/pages/Introduce';
import PurchaseHistory from '~/pages/PurchaseHistory';
import OrderDetails from '~/pages/OrderDetail';
import VerificationPage from '~/pages/VerifiMail';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { Mail, ResetPass, NotifyVerified } from '../pages/mail';
import EmptyLayout from '../components/Layout/EmptyLayout';
import SearchItem from '~/pages/SearchItem';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/contact', component: Contact },
    { path: '/item_detail', component: ItemDetail },
    { path: '/item_group', component: ItemGroup },
    { path: '/introduce', component: Introduce },
    { path: '/items', component: Items },
    { path: '/VerificationPage', component: VerificationPage },
    { path: '/resetpass/mail', layout: EmptyLayout, component: Mail },
    { path: '/resetpass/confirm', layout: EmptyLayout, component: ResetPass },
    { path: '/nofify/verified', layout: EmptyLayout, component: NotifyVerified },
    { path: '/search', component:  SearchItem },
];

const privateRoutes = [
    { path: '/order_detail', component: OrderDetails },
    { path: '/cart', layout: DefaultLayout, component: Cart },
    { path: '/payment', layout: DefaultLayout, component: Payment },
    { path: '/information', component: Infomation },
    { path: '/purchase_history', component: PurchaseHistory },
];

export { publicRoutes, privateRoutes };
