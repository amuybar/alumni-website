import { lazy } from 'react';

const Home = lazy(() => import('./pages/Main-pages/Home'));
const About = lazy(() => import('./pages/Main-pages/About'));
const NotFound = lazy(() => import('./pages/Main-pages/NotFound'));
const EventsPage = lazy(() => import('./pages/Main-pages/EventsPage'));
const AddEventForm = lazy(() => import('./pages/Main-pages/AddEventForm'));
const ProfilePage = lazy(() => import('./pages/Main-pages/Profile'));
const LoginForm = lazy(() => import('./pages/auth-Pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth-Pages/RegisterPage'));
const EditProfile = lazy(() => import('./pages/auth-Pages/EditProfile'));
const ResetPassword = lazy(() => import('./pages/auth-Pages/ResetPassword'));
const SaccoPage = lazy(() => import('./pages/Main-pages/Sacco'));
const GalleryPage = lazy(() => import('./pages/Main-pages/Gallery'));

const LoansProfile = lazy(() => import('./pages/Main-pages/LoansProfile'));
const SaccoFAQ = lazy(() => import('./pages/Main-pages/SaccoFAQ'));
const BoardPage = lazy(() => import('./pages/Main-pages/Board')); 
const NewsPage = lazy(() => import('./pages/Main-pages/NewsPage'));
const ManageSaccoPage = lazy(() => import('./pages/Main-pages/ManageSacco'));
const ManageLoans = lazy(() => import('./pages/Main-pages/ManageLoans'));
const Shares = lazy(() => import('./pages/Main-pages/Shares'));


export { Home, About, NotFound, EventsPage, AddEventForm, ProfilePage, LoginForm, RegisterPage, EditProfile,SaccoPage,GalleryPage ,Shares,LoansProfile,SaccoFAQ,BoardPage,NewsPage,ResetPassword,ManageSaccoPage,ManageLoans,};
