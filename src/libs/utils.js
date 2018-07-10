import NProgress from 'nprogress';

export default {
    nProgress: () => {
        NProgress.configure({showSpinner: false});
        return {
            start: () => {
                NProgress.start();
            },
            done: () => {
                NProgress.done();
            },
        }
    }
}