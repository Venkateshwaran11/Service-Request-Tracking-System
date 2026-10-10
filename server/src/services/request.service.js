import ServiceRequest from "../models/ServiceRequest.js";
import User from "../models/User.js";

const createRequest = async (data) => {
  return ServiceRequest.create(data);
};

const getRequests = async (user) => {
  let query = {};

  if (user.role === "USER") {
    query.createdBy = user.id;
  }

  if (user.role === "AGENT") {
    query.assignedTo = user.id;
  }

  return ServiceRequest.find(query)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });
};

const getRequestById = async (id, user) => {
  const request = await ServiceRequest.findById(id)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

  if (!request) {
    throw new Error("Service request not found");
  }

  if (
    user.role === "USER" &&
    request.createdBy?._id?.toString() !== user.id
  ) {
    throw new Error("Access denied");
  }

  if (
    user.role === "AGENT" &&
    (
      !request.assignedTo ||
      request.assignedTo?._id?.toString() !== user.id
    )
  ) {
    throw new Error("Access denied");
  }

  return request;
};

const updateRequest = async (
  id,
  data,
  user
) => {
  const request = await ServiceRequest.findById(id);

  if (!request) {
    throw new Error("Service request not found");
  }

  if (
    user.role === "USER" &&
    request.createdBy.toString() !== user.id
  ) {
    throw new Error("Access denied");
  }

  // User cannot change ownership/status/assignment.
  const allowedFields = [
    "title",
    "description",
    "category",
    "priority"
  ];

  const updateData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  return ServiceRequest.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteRequest = async (id, user) => {
  const request = await ServiceRequest.findById(id);

  if (!request) {
    throw new Error("Service request not found");
  }

  if (
    user.role === "USER" &&
    request.createdBy.toString() !== user.id
  ) {
    throw new Error("Access denied");
  }

  await request.deleteOne();

  return request;
};

const assignRequest = async (
  id,
  agentId
) => {
  const agent = await User.findOne({
    _id: agentId,
    role: "AGENT"
  });

  if (!agent) {
    throw new Error("Valid agent not found");
  }

  const request =
    await ServiceRequest.findByIdAndUpdate(
      id,
      {
        assignedTo: agentId,
        status: "ASSIGNED"
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

  if (!request) {
    throw new Error("Service request not found");
  }

  return request;
};

const updateStatus = async (
  id,
  status,
  user
) => {
  const request = await ServiceRequest.findById(id);

  if (!request) {
    throw new Error("Service request not found");
  }

  if (
    user.role === "AGENT" &&
    (
      !request.assignedTo ||
      request.assignedTo.toString() !== user.id
    )
  ) {
    throw new Error("You are not assigned to this request");
  }

  request.status = status;

  await request.save();

  return request;
};

export {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  assignRequest,
  updateStatus
};