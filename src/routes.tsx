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
const SaccoPage = lazy(() => import('./pages/Main-pages/Sacco'));
const OppotunityPage = lazy(() => import('./pages/Main-pages/Oppotunity'));
const ShareOpportunityForm = lazy(() => import('./componets/ShareOppotunityForm'));

export { Home, About, NotFound, EventsPage, AddEventForm, ProfilePage, LoginForm, RegisterPage, EditProfile,SaccoPage,OppotunityPage ,ShareOpportunityForm};
