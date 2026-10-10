import {
  createRequest as createRequestService,
  getRequests as getRequestsService,
  getRequestById,
  updateRequest as updateRequestService,
  deleteRequest as deleteRequestService,
  assignRequest as assignRequestService,
  updateStatus as updateStatusService
} from "../services/request.service.js";

import {
  successResponse,
  createdResponse
} from "../utils/apiResponse.js";

const createRequest = async (req, res, next) => {
  try {
    const request =
      await createRequestService({
        ...req.body,
        createdBy: req.user.id
      });

    return createdResponse(
      res,
      request,
      "Service request created"
    );
  } catch (error) {
    next(error);
  }
};

const getRequests = async (req, res, next) => {
  try {
    const requests =
      await getRequestsService(req.user);

    return successResponse(
      res,
      requests,
      "Requests fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getRequest = async (req, res, next) => {
  try {
    const request =
      await getRequestById(
        req.params.id,
        req.user
      );

    return successResponse(
      res,
      request,
      "Request fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const request =
      await updateRequestService(
        req.params.id,
        req.body,
        req.user
      );

    return successResponse(
      res,
      request,
      "Request updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    await deleteRequestService(
      req.params.id,
      req.user
    );

    return successResponse(
      res,
      null,
      "Request deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

const assignRequest = async (req, res, next) => {
  try {
    const request =
      await assignRequestService(
        req.params.id,
        req.body.agentId
      );

    return successResponse(
      res,
      request,
      "Request assigned successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const request = await updateStatusService(req.params.id, req.body.status, req.user);
    return successResponse(res, request, "Status updated successfully");
  } catch (error) {
    next(error);
  }
};

export {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  assignRequest,
  updateStatus
};