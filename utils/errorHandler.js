import { Router } from 'express';

export const handleError = async (err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: "An internal error occured!" })
    }
    next()
}

class EnhancedRouter extends Router {
    wrapHandle(fn) {
        return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
    }
    route(path) {
        const route = super.route(path);
        route.all((req, res, next) => {
            try {
                const wrappedHandler = this.wrapHandle(route.handle.bind(route));
                return wrappedHandler(req, res, next);
            } catch (error) {
                return next(error);
            }
        });

        return route;
    }
}

export default EnhancedRouter;