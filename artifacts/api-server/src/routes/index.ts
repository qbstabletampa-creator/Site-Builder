import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import flagRegistrationsRouter from "./flag-registrations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(flagRegistrationsRouter);

export default router;
