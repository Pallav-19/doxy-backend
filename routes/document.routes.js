import { Router } from "express";
import { renameDocument } from "../controllers/documents/rename.document.js";
import { makePublic } from "../controllers/documents/makePublic.js";
import { makePubliclyEditable } from "../controllers/documents/makePubliclyEditable.js";
import { getAllDocuments } from "../controllers/documents/getAllDocuments.js";
import { getCollaborators } from "../controllers/documents/collaborators/get.collaborators.js";
import { getCollaboratorsOptions } from "../controllers/documents/collaborators/get.collaboratorOptions.js"
import { addCollaborators } from "../controllers/documents/collaborators/add.collaborators.js";
import { removeCollaborator } from "../controllers/documents/collaborators/remove.collaborators.js";
import { getViewersOptions } from "../controllers/documents/viewers/get.viewersOptions.js";
import { addViewers } from "../controllers/documents/viewers/add.viewers.js";
import { getViewers } from "../controllers/documents/viewers/get.viewers.js";
import { removeViewer } from "../controllers/documents/viewers/remove.viewer.js";
const router = Router()
router.patch("/rename/:id", renameDocument)
router.patch("/changeViewAccess/:id", makePublic)
router.patch("/changeEditAccess/:id", makePubliclyEditable)
router.get("/getAllDocuments", getAllDocuments)

router.get("/getCollaborators/:id", getCollaborators)
router.get("/getCollaboratorsOptions/:id", getCollaboratorsOptions)
router.patch("/addCollaborators/:id", addCollaborators)
router.patch("/removeCollaborator/:id/:removeId", removeCollaborator)

router.get("/getViewers/:id", getViewers)
router.get("/getViewersOptions/:id", getViewersOptions)
router.patch("/addViewers/:id", addViewers)
router.patch("/removeViewer/:id/:removeId", removeViewer)

export default router