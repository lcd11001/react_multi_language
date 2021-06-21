import React, { Fragment, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import ID from './Translations/ID.json'
import EN from './Translations/EN.json'
import VN from './Translations/VN.json'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from './Styles'

import { AnimatePresence, motion } from 'framer-motion'

import store from './Redux/Store'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'

import CircularLoading from './Components/CircularLoading'
import PageNotFound from './Components/PageError/PageNotFound'
import ScrollToTop from './Components/ScrollToTop'

import { CssBaseline } from '@material-ui/core'

/*
import App from './Containers/App'
import Home from './Containers/Home'
import About from './Containers/About'
import Blogs from './Containers/Blogs'
import Capabilites from './Containers/Capabilites'
import Contact from './Containers/Contact'

*/

// MUST after import session
// split code: https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const App = lazy(() => import('./Containers/App'))
const Home = lazy(() => import('./Containers/Home'))
const About = lazy(() => import('./Containers/About'))
const Blogs = lazy(() => import('./Containers/Blogs'))
const Capabilites = lazy(() => import('./Containers/Capabilites'))
const Contact = lazy(() => import('./Containers/Contact'))

const metadata = require('./metadata.json')
console.log('metadata', metadata)

i18next
    // first: init multi language
    .init({
        debug: process.env.NODE_ENV === 'development',
        react: {
            wait: true
        },
        interpolation: {
            escapeValue: false
        },
        lng: ID.COMMON.LANGUAGE_EN,
        fallbackLng: ID.COMMON.LANGUAGE_EN,
        resources: {
            [ID.COMMON.LANGUAGE_EN]: EN,
            [ID.COMMON.LANGUAGE_VN]: VN
        },
        ns: Object.keys(ID)
    })
    // then: remove loading icon
    .then(t =>
    {
        const divLoading = document.getElementById('loading')
        document.body.removeChild(divLoading)
    })

// https://github.com/framer/motion/issues/466
const MotionRedirect = ({ children, ...props }) => (
    <motion.div exit={'undefined'}>
        <Redirect {...props} />
    </motion.div>
)

const Routes = () =>
{
    return (
        <MuiThemeProvider theme={defaultTheme}>
            <Provider store={store}>
                <I18nextProvider i18n={i18next}>
                    <Router>
                        <Suspense fallback={<CircularLoading message='' backgroundColor='#FFFFFF' />}>
                            <Fragment>
                                <CssBaseline />
                                {/* Fixed: when navigating into another page, its position will remain like the page before. So it won't scroll to top automatically */}
                                <ScrollToTop />
                                <App>
                                    <Route render={({ location }) => (
                                        <AnimatePresence initial={false} exitBeforeEnter={true}>

                                            <Switch location={location} key={location.pathname}>
                                                {/* Homepage === Profile because of user permission */}
                                                <MotionRedirect exact from='/' to={i18next.t(ID.LINK.HOME)} />

                                                {/* single page */}
                                                <Route exact path={i18next.t(ID.LINK.HOME)} component={Home} />
                                                <Route exact path={i18next.t(ID.LINK.ABOUT)} component={About} />
                                                <Route exact path={i18next.t(ID.LINK.BLOG)} component={Blogs} />
                                                <Route exact path={i18next.t(ID.LINK.CAPABILITIES)} component={Capabilites} />
                                                <Route exact path={i18next.t(ID.LINK.CONTACT)} component={Contact} />
                                                
                                                {/* invalid path */}
                                                <Route path='*' component={PageNotFound} />
                                            </Switch>

                                        </AnimatePresence>
                                    )} />
                                </App>
                            </Fragment>
                        </Suspense>
                    </Router>
                </I18nextProvider>
            </Provider>
        </MuiThemeProvider>
    )
}

// remove React.StrictMode to fix findDOMNode is deprecated
// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode
ReactDOM.render(
    <Fragment>
        <Routes />
    </Fragment>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
