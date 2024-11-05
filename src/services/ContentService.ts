import { stringify } from "json5";
import { getLocalStoredUserData } from "./LocalStorageService";
import { delApi, get, post } from "./RestClient";
import axios from "axios";
import { MIME_TYPE } from "@/utils/app.config";
const authToken = process.env.NEXT_PUBLIC_AUTH_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { v4 as uuidv4 } from "uuid";
import { ChannelID } from "@/utils/app.constant";

const userId = getLocalStoredUserData();
console.log("userId ==>", userId);

export const getPrimaryCategory = async () => {
  const apiURL = `/api/channel/v1/read/${ChannelID}`;
  try {
    const response = await get(apiURL);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

// const PrimaryCategoryData = async () => {
//   const response = await getPrimaryCategory();
//   const collectionPrimaryCategories =
//     response?.channel?.collectionPrimaryCategories;
//   const contentPrimaryCategories = response?.channel?.contentPrimaryCategories;

//   const PrimaryCategory = [
//     ...collectionPrimaryCategories,
//     ...contentPrimaryCategories,
//   ];
//   return PrimaryCategory;
// };

const defaultReqBody = {
  request: {
    filters: {
      createdBy: userId,
    },
    sort_by: {
      lastUpdatedOn: "desc",
    },
  },
};

const getReqBodyWithStatus = (
  status: string[],
  query: string,
  limit: number,
  offset: number,
  primaryCategory: any,
  sort_by: any
) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    var PrimaryCategory = JSON.parse(
      localStorage.getItem("PrimaryCategory") || ""
    );
  }
  primaryCategory =
    primaryCategory.length === 0 ? PrimaryCategory : primaryCategory;

  return {
    ...defaultReqBody,
    request: {
      ...defaultReqBody.request,
      filters: {
        ...defaultReqBody.request.filters,
        status,
        primaryCategory,
      },
      query,
      limit,
      offset,
      sort_by,
    },
  };
};

export const getContent = async (
  status: string[],
  query: string,
  limit: number,
  offset: number,
  primaryCategory: string[],
  sort_by: any
) => {
  const apiURL = "/action/composite/v3/search";
  try {
    const reqBody = getReqBodyWithStatus(
      status,
      query,
      limit,
      offset,
      primaryCategory,
      sort_by
    );
    const response = await post(apiURL, reqBody);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

export const createQuestionSet = async () => {
  const apiURL = `/action/questionset/v2/create`;
  const reqBody = {
    request: {
      questionset: {
        name: "Untitled QuestionSet",
        mimeType: "application/vnd.sunbird.questionset",
        primaryCategory: "Practice Question Set",
        code: "de1508e3-cd30-48ba-b4de-25a98d8cfdd2",
        createdBy: userId,
      },
    },
  };

  try {
    const response = await axios.post(apiURL, reqBody, {
      headers: {
        "Content-Type": "application/json",
        tenantId: "ef99949b-7f3a-4a5f-806a-e67e683e38f3",
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (identifier: string, mimeType: string) => {
  const questionsetRetireURL = `/action/questionset/v2/retire/${identifier}`;
  const contentRetireURL = `/action/content/v3/retire/${identifier}`;
  let apiURL = "";
  if (mimeType === MIME_TYPE.QUESTIONSET_MIME_TYPE) {
    apiURL = questionsetRetireURL;
  } else if (
    mimeType !== MIME_TYPE.QUESTIONSET_MIME_TYPE &&
    mimeType !== MIME_TYPE.COLLECTION_MIME_TYPE
  ) {
    apiURL = contentRetireURL;
  }
  try {
    const response = await delApi(apiURL); // Assuming you have a 'del' method that handles DELETE
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (userId: any) => {
  const apiURL = `/action/content/v3/create`;

  const reqBody = {
    request: {
      content: {
        code: uuidv4(), // Generate a unique ID for 'code'
        name: "Untitled Course",
        description: "Enter description for Course",
        createdBy: userId,
        createdFor: ["test-k12-channel"],
        mimeType: MIME_TYPE.COURSE_MIME_TYPE,

        resourceType: "Course",
        primaryCategory: "Course",
        contentType: "Course",
      },
    },
  };

  try {
    const response = await axios.post(apiURL, reqBody, {});
    return response?.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const publishContent = async (identifier: any) => {
  const requestBody = {
    request: {
      content: {
        lastPublishedBy: userId,
      },
    },
  };

  try {
    const response = await axios.post(
      `/action/content/v3/publish/${identifier}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error("Error during publishing:", error);
    throw error;
  }
};

export const submitComment = async (identifier: any, comment: any) => {
  const requestBody = {
    request: {
      content: {
        rejectComment: comment,
      },
    },
  };

  try {
    const response = await axios.post(
      `/action/content/v3/reject/${identifier}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
